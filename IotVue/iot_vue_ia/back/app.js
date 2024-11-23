const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Tabelas do banco de dados
const users = require('./models/Usuario');
const perguntas = require('./models/Pergunta');
const respostas = require('./models/Resposta')

app.post('/logar', async (req, res) => 
{
    const { email, password } = req.body;

    const user = await users.findOne({
        where: { email: email }
    });

    if (user == null)
    {
        res.status(200).json({ status: 0, message: 'usuário não encontrado.' });
        return;
    }

    if (user.password != password)
    {
        res.status(200).json({ status: 0, message: 'senha incorreta.'});
        return;
    }

    req.status(200).json({ status: 1, account: { username: user.username, email: user.email }, message: 'usuário logado com sucesso. '});
})

app.post('/cadastrouser', async(req,res)=>{
    console.log('Dados recebidos:', req.body);
    const { user, email, senha } = req.body;

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
})

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})