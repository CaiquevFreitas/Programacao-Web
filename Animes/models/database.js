const Sequelize = require('sequelize');
const sqlz = new Sequelize('anime','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

sqlz.authenticate().then(()=>{
    console.log("Conectado com sucesso!");
}).catch((erro)=>{
    console.log("Falha ao se conectar: "+ erro);
})

module.exports ={
    Sequelize: Sequelize,
    sqlz: sqlz
}