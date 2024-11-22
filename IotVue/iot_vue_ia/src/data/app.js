const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Tabelas do banco de dados
const users = require('../../models/Usuario');
const perguntas = require('../../models/Pergunta');
const respostas = require('../../models/Resposta')

app.post('/cadastrouser', async(req,res)=>{
    console.log('Dados recebidos:', req.body);
    const { user, email, senha } = req.body;

    try {
        await users.create({
            username: user,
            email: email,
            senha: senha
        })
        res.status(201).redirect('http://localhost:8080/Cadastro')
    } catch (error) {
        res.status(503).json({error: error.message})
    }
})

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})