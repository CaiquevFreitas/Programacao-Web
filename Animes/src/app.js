const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));//permite que o navegador acesse as imagens

app.get('/',(req,res)=>{
    res.render('inicio');
})

app.get('/lista',(req,res)=>{
    res.render('listaAnimes');
})

app.listen(port,()=>{
    console.log(`Servidor rodando: localhost:${port}`);
});