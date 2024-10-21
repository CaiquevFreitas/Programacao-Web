const db  = require("./db");
//const {DataTypes} = require('sqlz')

const Prod = db.sqlz.define('produtos', {
    nome: {
        type: db.Sequelize.STRING,
        allownull: false
    },
    preco: {
        type: db.Sequelize.FLOAT,
        allownull: false
    }
});

Prod.sync()
    .then(()=>
        console.log("Tabela produtos sincronizada"))
    .catch(err => 
        console.log("Erro ao sincronizar: ", err))

module.exports = Prod;