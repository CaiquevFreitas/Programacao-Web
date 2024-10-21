// 1. Instalação das Dependências:
const express = require('express')
const app = express()
const port = 3450

const db = require('./models/produto');
const { where } = require('sequelize');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/produtos/lista', async (req, res) => {
    try {
        const produtos = await db.findAll();
        res.status(200)
        res.render("index", { produtos });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/produtos/lista/:id', async(req,res)=>{
    const id =  req.params.id
    try {
        const produtos = [await db.findByPk(id)];
        res.status(200)
        res.render("index", {produtos});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/produtos/cadastrar', async (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    try {
        await db.create({
            nome: nome,
            preco: preco
        })
        res.status(201).redirect("/produtos/lista");
    } catch (error) {
        res.status(503).json({error: err.message})
    }
})

app.delete('/produtos/deletar/:id', async(req,res)=>{
    const id = req.params.id
    try {
        await db.destroy({where: {id: id}});
        res.redirect("/produtos/lista");
    } catch (error) {
        res.status(503).json({error: err.message})
    }
})

app.delete('/produtos/apagar', async(req,res)=>{
    try {
        await db.destroy({where: {}});
        res.redirect("/produtos/lista");
    } catch (error) {
        res.status(503).json({error: err.message})
    }
})

app.put('/produtos/editar/:id/:nome/:preco', async(req,res)=>{
    const {id,nome,preco} = req.params;
    try {
        await db.update(
            { nome: nome, preco: preco }, 
            { where: { id: id } } 
        );
        res.redirect("/produtos/lista");
    } catch (error) {
        res.status(503).json({error: err.message})
    }
})

// 6. Iniciando o Servidor - Inicia o servidor na porta.
app.listen(port, () => {
    console.log(`Servidor funcionando http://localhost:${port}`)
})