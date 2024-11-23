const {Sequelize, sequelize} = require('./database');

class Usuario extends Sequelize.Model {};

Usuario.init({
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    saldo: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0
    }
},{
    sequelize,
    modelName: 'detectorMentiras',
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;