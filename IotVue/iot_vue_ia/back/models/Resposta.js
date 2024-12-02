const { Sequelize, sequelize } = require('./database');
const Pergunta = require('./Pergunta'); 

class Resposta extends Sequelize.Model {}

Resposta.init({
    id_resposta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    resp: {
        type: Sequelize.ENUM('Verdadeiro', 'Falso'),
        allowNull: false
    },
    fk_id_pergunta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Pergunta, 
            key: 'id_pergunta'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'Resposta',
    tableName: 'resposta',
    timestamps: false 
});

module.exports = Resposta;
