const express = require('express');
const cors = require('cors');
const port = 3000;

require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Responda Verdadeiro caso a pergunta seja Verdadeira, caso contrário responda Falso.",
});

const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'DELETE','PUT'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Tabelas do banco de dados
const users = require('./models/Usuario');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');


Pergunta.hasOne(Resposta, {
    foreignKey: 'fk_id_pergunta',
    as: 'resposta',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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

    const user = await users.findOne({
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
    const verificEmail = await users.findOne({
        where: { email: email }
    });

    if(verificEmail == null){
        try {
            const userData = {
                username: user,
                email: email,
                senha: senha
            }
    
            await users.create(userData)
    
            res.status(200).json({ status: 200, username: userData.username, email: userData.email })
        } catch (error) {
            res.status(503).json({error: error.message})
        }
    }else{
        res.json({message: "Esse email já está sendo utilizado por outro usuário", verificEmail: false})
    }
    
})

//ROTA que seleciona  todas as perguntas e mostra na página lista
app.get('/listarPerguntas',(req,res)=>{
    
})

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
        console.log(text);
        const novaPergunta = await Pergunta.create({
            texto: pergunta,
            fk_id_user: id
        });
            
        const novaResposta = await Resposta.create({
            resp: text,
            fk_id_pergunta: novaPergunta.id_pergunta,
        });

        res.status(200).json({
            status: 1,
            message: "Pergunta enviada e processada com sucesso.",
            resposta: text
        });

    } catch (error) {
        console.error("Erro ao processar pergunta:", error.message);
        res.status(503).json({ status: 0, error: error.message });
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