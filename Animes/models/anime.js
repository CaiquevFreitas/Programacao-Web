//Model: É a classe base para todos os modelos no Sequelize.
//DataTypes: Contém tipos de dados que você pode usar para definir os atributos (colunas) do seu modelo.
const {Model, DataTypes} = require('./database');

class Anime extends Model{};

Anime.init({
    nome: {
        type: DataTypes.String,
        allowNull: false,
    },
    genero: {
        type: DataTypes.String,
        allowNull: false,
    },
    nota: {
        type: DataTypes.Double,
        allowNull: false,
    },
    classificacao: {
        type: DataTypes.String,
        allowNull: false,
    }
},
{
    sqlz,
    modelName: 'Anime',
    tableName: 'lista_anime',
    timestamps: false,
});

module.exports = Anime;