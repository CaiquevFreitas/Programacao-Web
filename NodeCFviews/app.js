// 1. Instalação das Dependências:
const express = require('express') 
const app = express() 
const port = 3450 

const connectDB = require('./database');
const db = connectDB();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.get('/produtos/lista', async(req,res)=>{
    await db.all(`SELECT * FROM produtos`,(err,rows)=>{
        if(err){
            console.status(503).json({error: err.message})
        }else{
            res.render("index", {rows});
        }
    })
})

app.get('/produtos/lista/:id', async(req,res)=>{
    const id =  req.params.id
     await db.all(`SELECT * FROM produtos WHERE id = ?`,id,(err,rows)=>{
        if(err){
            res.status(503).json({error: err.message})
        }
        if(!rows){
            res.status(404).json({message: "Produto não encontrado"})
        }
        res.render("index", {rows});
    })
})

app.post('/produtos/cadastrar', async(req,res)=>{
    const nome = req.body.nome;
    const preco = req.body.preco;
    await db.run(`INSERT INTO produtos(nome,preco) values(?,?)`,nome,preco, function(err){
        if(err){
            res.status(503).json({error: err.message})
        }
        res.status(201).redirect("/produtos/lista");
    })
})

app.delete('/produtos/deletar/:id', async(req,res)=>{
    const id = req.params.id
     await db.run(`DELETE FROM produtos WHERE id = ?`,id, function(err){
        if(err){
            res.status(503).json({error: err.message})
        }
        res.redirect("/produtos/lista");
    })
})

app.delete('/produtos/apagar', async(req,res)=>{
     await db.run(`DELETE FROM produtos`, function(err){
        if(err){
            res.status(503).json({error: err.message})
        }
        res.redirect("/produtos/lista")
    })
})

app.put('/produtos/editar/:id/:nome/:preco', async(req,res)=>{
    const {id,nome,preco} = req.params;

    await db.run(`UPDATE produtos SET nome = ?, preco = ?  WHERE id = ?`,[nome,preco,id], function(err){
        if(err){
            res.status(503).json({error: err.message})
        }
        res.redirect("/produtos/lista");
    })
})

// 6. Iniciando o Servidor - Inicia o servidor na porta.
app.listen(port, ()=>{
    console.log(`Servidor funcionando http://localhost:${port}`)
})