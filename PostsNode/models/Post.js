const db = require("./db");

//Model para criar tabelas no banco de dados
const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

//Post.sync({force: true}); Sincroniza o model com o mysql 

module.exports = Post;