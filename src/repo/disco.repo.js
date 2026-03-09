const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");

const IDENTIFICADOR = "discos";

const DiscoRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        nome: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        urlThumb: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'url_thumb'
        },
        publicId: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'public_id'
        },
        publicIdThumb: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'public_id_thumb'
        },
        contentType: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: 'content_type'
        },
        extension: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: 'extension'
        },
        discoId: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0,
            field: 'disco_id'
        },
        tipo: {
            type: DataTypes.ENUM('pasta', 'imagem', 'video'),
            allowNull: false,
            defaultValue: 'pasta' // Optional: Set a default value
        }
    },
    {
        timestamps: true,
        tableName: IDENTIFICADOR
    },
);

module.exports = { DiscoRepo };