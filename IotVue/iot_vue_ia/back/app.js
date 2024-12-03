const express = require('express');
const cors = require('cors');
const port = 3000;
const mqtt = require('mqtt');
require('dotenv').config();

// Link: https://testclient-cloud.mqtt.cool/
const brokerUrl = 'mqtt://broker.hivemq.com';
const topic = 'equipevueiotia';


const mqttClient = mqtt.connect(brokerUrl);
mqttClient.on('connect', () => {
    console.log('Conectado ao broker MQTT');
});
mqttClient.on('error', (err) => {
    console.error('Erro ao conectar ao broker MQTT:', err);
});

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Responda Verdadeiro caso a pergunta seja Verdadeira, caso contrário responda Falso",
});

const app = express();
app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'DELETE','PUT'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Tabelas do banco de dados
const User = require('./models/Usuario');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');

User.hasOne(Pergunta, {
    foreignKey: 'fk_id_user',
    as: 'pergunta',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});


Pergunta.hasOne(Resposta, {
    foreignKey: 'fk_id_pergunta',
    as: 'resposta',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Pergunta.belongsTo(User, {
    foreignKey: 'fk_id_user',
    as: 'user'
});

// Uma Resposta pertence a uma Pergunta
Resposta.belongsTo(Pergunta, {
    foreignKey: 'fk_id_pergunta',
    as: 'pergunta'
});


//ROTA de login
app.post('/logar', async (req, res) => 
{
    const { email, password } = req.body;
    console.log("email: "+email, "senha: "+password)

    const user = await User.findOne({
        where: { email: email }
    });

    if (user == null)
    {
        res.status(200).json({ status: 0, message: 'usuário não encontrado.' });
        return;
    }

    if (user.senha != password)
    {
        res.status(200).json({ status: 0, message: 'senha incorreta.'});
        return;
    }

    res.status(200).json({ status: 1, account: { id: user.id_user, username: user.username, email: user.email, saldo: user.saldo }});
})

//ROTA de cadastro
app.post('/cadastrouser', async(req,res)=>{
    console.log('Dados recebidos:', req.body);
    const { user, email, senha } = req.body;
    const verificEmail = await User.findOne({
        where: { email: email }
    });

    if(verificEmail == null){
        try {
            const userData = {
                username: user,
                email: email,
                senha: senha
            }
    
            await User.create(userData)
    
            res.status(200).json({ status: 200, username: userData.username, email: userData.email })
        } catch (error) {
            res.status(503).json({error: error.message})
        }
    }else{
        res.json({message: "Esse email já está sendo utilizado por outro usuário", verificEmail: false})
    }
    
})

//ROTA que seleciona  todas as perguntas e mostra na página lista
app.get('/listarPerguntas', async (req, res) => {
    try {
        const perguntas = await Pergunta.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id_user', 'username', 'email'] 
                },
                {
                    model: Resposta,
                    as: 'resposta',
                    attributes: ['resp'] 
                }
            ]
        });

        const perguntaFormatada = perguntas.map(pergunta => {
            return {
                id_pergunta: pergunta.id_pergunta,
                texto: pergunta.texto,
                user: pergunta.user ? pergunta.user.get({ plain: true }) : null, 
                resposta: pergunta.resposta ? pergunta.resposta.get({ plain: true }) : null
            };
        });

        res.status(200).json(perguntaFormatada);
    } catch (error) {
        console.error("Erro ao listar perguntas:", error.message);
        res.status(503).json({ error: error.message });
    }
});


//ROTA que seleciona as perguntas de um usuário e mostra na página perfil
app.get("/perguntasPerfil/:id", async (req,res)=>{
    const {id} = req.params;

    const perguntaComResposta = await Pergunta.findAll({
        where: { fk_id_user: id },
        include: {
          model: Resposta,
          as: 'resposta',
        }
    })

    res.status(200).json({perguntaComResposta})
})

//ROTA que envia a pergunta ao GEMINI
app.post("/enviarPegunta/:id", async (req, res) => {
    const { id } = req.params;
    const { pergunta } = req.body;

    try {
        const result = await model.generateContent(pergunta + "?");
        const response = result.response;
        const text = response.text().trim();

        const novaPergunta = await Pergunta.create({
            texto: pergunta,
            fk_id_user: id
        });
            
        const novaResposta = await Resposta.create({
            resp: text,
            fk_id_pergunta: novaPergunta.id_pergunta,
        });


        mqttClient.publish(topic, text, (err) => {
            if (err) {
                console.error('Erro ao publicar mensagem:', err);
                return res.status(500).json({ error: 'Erro ao publicar mensagem.' });
            }

            console.log(`Mensagem publicada no tópico ${topic}: ${text}`);
            return res.status(200).json({
                status: 1,
                message: "Pergunta enviada e processada com sucesso.",
                resposta: text
            });
        });

    } catch (error) {
        console.error("Erro ao processar pergunta:", error.message);
        return res.status(503).json({ status: 0, error: error.message });
    }
});


//ROTA que apaga pergunta do Usuário
app.delete("/deletarPergunta/:id", async(req,res)=>{
    const {id} = req.params;

    try {
        await Pergunta.destroy({where: {id_pergunta: id}})

        res.status(200).json({message: "Pergunta excluida com sucesso!"})
    } catch (error) {
        console.log("Erro: "+ error)
        res.status(503).json({error: error.message})
    }
})

//ROTA que edita pergunta do Usuário
app.put("/editarPergunta/:id", async(req,res)=>{
    const {id} = req.params
    const {pergunta} = req.body
    try {
        await Pergunta.update(
            {texto: pergunta},
            {where: {id_pergunta: id}});

            const result = await model.generateContent(pergunta + "?");
            const response = result.response;
            const text = response.text().trim();

            await Resposta.update(
                {resp: text},
                {where: {fk_id_pergunta: id}});

        res.status(200).json({message: "Pergunta editada com sucesso!"})
    } catch (error) {
        console.log("Erro: "+ error)
        res.status(503).json({error: error.message})
    }
})

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})