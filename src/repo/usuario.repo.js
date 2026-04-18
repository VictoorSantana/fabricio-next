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
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'email'
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
        facebookToken: {
            type: DataTypes.STRING(550),
            allowNull: true,
            field: 'facebook_token'
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