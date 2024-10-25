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

app.post('/cadastro', async(req,res)=>{
    const nome = req.body.nome;
    const genero = req.body.genero;
    const nota = parseFloat(req.body.nota);
    const classificacao = classificar(nota);
    try {
        await db.create({
            nome: nome,
            genero: genero,
            nota: nota,
            classificacao: classificacao
        })
        res.status(201).redirect('/cadastro')
    } catch (error) {
        res.status(503).json({error: error.message});
    }
})

//ROTA editar
app.get('/editar',(req,res)=>{
    res.render("editar");
})

function classificar(nota){
    if(nota <= 5.9){
        return "Ruim";
    }
    else if(nota >= 6 && nota <= 6.9){
        return "Mediano";
    }
    else if(nota >= 7 && nota <= 8.9){
        return "Bom";
    }
    else if(nota >= 9.0){
        return "Excelente";
    }
}

app.listen(port,()=>{
    console.log(`Servidor rodando: localhost:${port}`);
});
