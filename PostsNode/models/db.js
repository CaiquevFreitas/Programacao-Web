//Pacote para trabalhar com banco de dados
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sistemaCadastro', 'root','',{
    host: "localhost",
    dialect: 'mysql'
});
//Verifica se a conexão foi bem-sucedida e exibe uma mensagem
sequelize.authenticate().then(()=>{
    console.log("Conectado com sucesso!");
}).catch((erro)=>{
    console.log("Falha ao se conectar: "+ erro);
})

//Exportando os pacotes
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}