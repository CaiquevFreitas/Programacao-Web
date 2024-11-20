const {Sequelize, sequelize} = require('./database');
const Usuario = require('./Usuario');

class Pergunta extends Sequelize.Model {};

Pergunta.init({
    id_pergunta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    texto: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    ia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    fk_id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
            key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'detectorMentiras',
    tableName: 'pergunta',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_alteracao'
});

module.exports = Pergunta;
