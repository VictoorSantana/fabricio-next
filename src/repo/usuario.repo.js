const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");

const IDENTIFICADOR = "usuarios";

const UsuarioRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        nome: {
            type: DataTypes.STRING(80),
            allowNull: false,
            defaultValue: 0,
            field: 'nome'
        },
        login: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: 0,
            field: 'login'
        },
        senha: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: 0,
            field: 'senha'
        },
        situacao: {
            type: DataTypes.ENUM('ativo', 'inativo'),
            allowNull: false,
            defaultValue: 'inativo' // Optional: Set a default value
        },
    },
    {
        timestamps: false,
        tableName: IDENTIFICADOR
    }
);

module.exports = { UsuarioRepo };