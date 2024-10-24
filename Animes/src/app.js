const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));//permite que o navegador acesse as imagens
const db = require('../models/anime');

//ROTA inicio
app.get('/',(req,res)=>{
    res.render('inicio');
})

//ROTA lista
app.get('/lista', async(req,res)=>{
    try {
        const animes = await db.findAll();
        res.status(200);
        res.render("lista", {animes});
    } catch (error) {
        res.status(500).json({message: error.message});
        res.render("lista");
    }
})

//ROTA cadastro
app.get('/cadastro',(req,res)=>{
    res.render("cadastro");
})

//ROTA editar
app.get('/editar',(req,res)=>{
    res.render("editar");
})

app.listen(port,()=>{
    console.log(`Servidor rodando: localhost:${port}`);
});
