const { Sequelize, sequelize } = require('./database');
const Usuario = require('./Usuario'); // Referência à model de usuário

class Pergunta extends Sequelize.Model {}

Pergunta.init({
    id_pergunta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    texto: {
        type: Sequelize.STRING(1000), // Corrigido para VARCHAR(1000)
        allowNull: false
    },
    ia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    fk_id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Usuario, // Referência à tabela de usuários
            key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // Deixa nulo se o usuário for excluído
    }
}, {
    sequelize,
    modelName: 'Pergunta',
    tableName: 'pergunta',
    timestamps: true, // Habilita createdAt e updatedAt
    createdAt: 'data_criacao', // Mapeia para o campo da tabela
    updatedAt: 'data_alteracao'
});

module.exports = Pergunta;
