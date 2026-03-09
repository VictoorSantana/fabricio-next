const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");
const { ImovelTipoEnum, ImovelModoEnum } = require("../models/imovel.model");

const IDENTIFICADOR = "anuncio";

const AnuncioRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        nome: {
            type: DataTypes.STRING(80),
            allowNull: false,            
            field: 'nome'
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,            
            field: 'email'
        },
        telefone: {
            type: DataTypes.STRING(16),
            allowNull: false,            
            field: 'telefone'
        },

        cep: {
            type: DataTypes.STRING(9),
            allowNull: false,                        
        },
        bairro: {
            type: DataTypes.STRING(100),
            allowNull: false,                        
        },
        cidade: {
            type: DataTypes.STRING(100),
            allowNull: false,                        
        },
        estado: {
            type: DataTypes.STRING(50),
            allowNull: false,                        
        },
        logradouro: {
            type: DataTypes.STRING(100),
            allowNull: false,                        
        },
        numero: {
            type: DataTypes.STRING(3),
            allowNull: false,                        
        },
        complemento: {
            type: DataTypes.STRING(100),
            allowNull: false,                        
        },

        visto: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: false
        },
        tipo: {
            type: DataTypes.ENUM(...ImovelTipoEnum),
            allowNull: false,
            defaultValue: 'condominio' // Optional: Set a default value
        },
        modo: {
            type: DataTypes.ENUM(...ImovelModoEnum),
            allowNull: false,
            defaultValue: 'vender' // Optional: Set a default value
        },
    },
    {
        timestamps: true,
        tableName: IDENTIFICADOR
    }
);

module.exports = { AnuncioRepo };