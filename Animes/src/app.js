const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));// Configurando o diretório de views de forma absoluta
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// Middleware para processar dados do formulário
app.use(express.static(path.join(__dirname, '../public')));//permite que o navegador acesse as imagens

const db = require('../models/anime');
const { Op } = require("sequelize");

//ROTA inicio
app.get('/',(req,res)=>{
    res.render('inicio');
})

//ROTAS lista
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

app.get('/lista/nota', async(req,res)=>{
    try {
        const animes = await db.findAll({order: [['nota','DESC']]});
        res.status(200);
        res.render("lista", {animes});
    } catch (error) {
        res.status(500).json({message: error.message});
        res.render("lista");
    }
})

app.get('/lista/nome/:nome', async(req,res)=>{
    const {nome} = req.params;
    try {
        const animes = [await db.findOne({
            where: { nome: { [Op.like]: `%${nome}%` } }
        })];
        res.status(200).render("lista", { animes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/lista/genero/:genero', async(req,res)=>{
    const {genero} = req.params;
    try {
        const animes = await db.findAll({where: {genero: { [Op.like]: `%${genero}%` }}});
        res.status(200);
        res.render("lista", {animes});
    } catch (error) {
        res.status(500).json({message: error.message});
        res.render("lista");
    }
})

//ROTAS cadastro
app.get('/cadastro',(req,res)=>{
    res.render("cadastro");
})

app.post('/cadastrar', async(req,res)=>{
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

//ROTAS editar
app.get('/editar',(req,res)=>{
    res.render("editar",{ selecionado: null });
})

app.get('/editar/:nome', async(req,res)=>{
    const {nome} = req.params;
    try {
        const selecionado = await db.findOne({
            where: { nome: { [Op.like]: `%${nome}%` } }
        });
        res.status(200).render("editar", { selecionado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.put('/editar/:id_anime', async (req, res) => {
    const { id_anime } = req.params;
    const { nome, genero, nota } = req.body;
    const notaAnime = parseFloat(nota);
    const classificacao = classificar(notaAnime);
    try {
        await db.update(
            { nome: nome, genero: genero, nota: notaAnime, classificacao: classificacao },
            { where: { id_anime: id_anime } }
        );
        res.status(200).json({ message: "Anime atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    console.log(`Servidor rodando: https://localhost:${port}`);
});
