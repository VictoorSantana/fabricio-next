const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");
const { ImovelTipoEnum, ImovelModoEnum, ImovelSituacaoEnum } = require("../models/imovel.model");

const IDENTIFICADOR = "imoveis";

const ImovelRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        slug: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        localizacao: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        m2Contruidos: {
            type: DataTypes.INTEGER(),
            allowNull: true
        },
        m2Terreno: {
            type: DataTypes.INTEGER(),
            allowNull: true
        },
        visualizacoes: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0
        },
        valorAluguel: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: 'valor_aluguel'
        },
        valorVenda: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: 'valor_venda'
        },
        qtdDomitorios: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            field: 'qtd_dormitorios'
        },
        qtdBanheiros: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            field: 'qtd_banheiros'
        },
        qtdGaragem: {
            type: DataTypes.INTEGER(),
            allowNull: true,
            field: 'qtd_garagem'
        },
        caracteristicas: {
            type: DataTypes.STRING(600),
            allowNull: true
        },
        detalhes: {
            type: DataTypes.STRING(1200),
            allowNull: true
        },
        destaque: {
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
        situacao: {
            type: DataTypes.ENUM(...ImovelSituacaoEnum),
            allowNull: false,
            defaultValue: 'offline' // Optional: Set a default value
        },
    },
    {
        timestamps: true,
        tableName: IDENTIFICADOR
    },
);

module.exports = { ImovelRepo };