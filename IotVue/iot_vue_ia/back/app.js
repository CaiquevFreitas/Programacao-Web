const express = require('express');
const cors = require('cors');
const port = 3000;
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Tabelas do banco de dados
const users = require('./models/Usuario');
const perguntas = require('./models/Pergunta');
const respostas = require('./models/Resposta');


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

//ROTA que seleciona as perguntas de um usuário e mostra na página perfil
app.get("/perguntasPerfil/:id", async (req,res)=>{
    const {id} = req.params;

    const perg = await perguntas.findAll({ where: {id_user: id} })

    res.status(200).json({perg})
})

//ROTA que envia a pergunta ao chatgpt
app.post("/enviarPegunta/:id", async (req, res) => {
    const { id } = req.params;
    const { pergunta } = req.body;

    try {
        const novaPergunta = await perguntas.create({
            texto: pergunta,
            fk_id_user: id
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4", 
            messages: [
                { role: "system", content: "Analise a pergunta enviada e responda somente verdadeiro ou falso" },
                { role: "user", content: pergunta }
            ]
        });

        const respostaChatGPT = response.data.choices[0].message.content;

        res.status(200).json({
            status: 1,
            message: "Pergunta enviada e processada com sucesso.",
            resposta: respostaChatGPT
        });

    } catch (error) {
        console.error("Erro ao enviar pergunta:", error.message);
        res.status(503).json({ status: 0, error: error.message });
    }
});


app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})