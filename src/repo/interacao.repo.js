const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");

const IDENTIFICADOR = "interacoes";

const InteracaoRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        nome: {
            type: DataTypes.STRING(80),
            allowNull: true,            
            field: 'nome'
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,            
            field: 'email'
        },
        mensagem: {
            type: DataTypes.STRING(250),
            allowNull: true,            
            field: 'mensagem'
        },
        telefone: {
            type: DataTypes.STRING(16),
            allowNull: true,            
            field: 'telefone'
        },
        hostname: {
            type: DataTypes.STRING(100),
            allowNull: true,            
            field: 'hostname'
        },
        tipo: {
            type: DataTypes.ENUM('newsletter', 'contato'),
            allowNull: false,
            defaultValue: 'contato' // Optional: Set a default value
        },
        visto: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: false
        },
    },
    {
        timestamps: true,
        tableName: IDENTIFICADOR
    }
);

module.exports = { InteracaoRepo };