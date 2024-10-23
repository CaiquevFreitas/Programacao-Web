//Model: É a classe base para todos os modelos no Sequelize.
const { Sequelize, sequelize } = require('./database'); 

class Anime extends Sequelize.Model {};

Anime.init({
    id_anime: {
        type: Sequelize.INTEGER,  
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nota: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    classificacao: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize,  
    modelName: 'Anime',
    tableName: 'lista_anime',
    timestamps: false,
});

module.exports = Anime;
