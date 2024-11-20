const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Tabelas do banco de dados
const users = require('../../models/Usuario');
const perguntas = require('../../models/Pergunta');
const respostas = require('../../models/Resposta')

app.post('/cadastroUser', async(req,res)=>{
    const { user, email, senha } = req.body;

    try {
        await users.create({
            username: user,
            email: email,
            senha: senha
        })
        res.status(201).redirect('http://localhost:8080/')
    } catch (error) {
        res.status(503).json({error: error.message})
    }
})