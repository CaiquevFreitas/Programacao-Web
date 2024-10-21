const Sequelize = require('sequelize');
const sqlz = new Sequelize({
    dialect: 'sqlite',
    storage: './banco.db'
});

sqlz.authenticate().then(()=>{
    console.log("Conectado com sucesso!");
}).catch((erro)=>{
    console.log("Falha ao se conectar: "+ erro);
})

module.exports ={
    Sequelize: Sequelize,
    sqlz: sqlz
}