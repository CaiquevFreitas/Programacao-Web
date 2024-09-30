// Framework Node
const express = require("express");
const app = express(); // Cria uma instância do express
const port = 8081;

// Configuração do template engine Handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body Parser serve para receber dados de qualquer formulario
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Postagens
const Post = require("./models/Post");

//Criando as Rotas do meu site
app.get("/", (req,res)=>{
    Post.findAll({order: [['id', 'Desc']]}).then((posts) => {
    // Converte cada post em um objeto simples
        const plainPosts = posts.map(post => post.get({ plain: true }));
        res.render('./layouts/home', { posts: plainPosts });
    }).catch((err) => {
        res.send("Erro ao carregar os posts: " + err);
    });
});

app.get("/cad",(req,res)=>{
    res.render('./layouts/formulario');
});

app.post("/add", (req,res)=>{
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(()=>{
       res.redirect('/');
    }).catch((erro)=>{
        res.send("Houve um erro:"+ erro);
    })
});

app.get('/deletar/:id', (req,res)=>{
    Post.destroy({where: {'id': req.params.id}}).then(()=>{
        res.send("Postagem deletada");
    }).catch(()=>{
        res.send("Essa postagem nao existe");
    })
})

//Função que abre o servidor
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`);
});

