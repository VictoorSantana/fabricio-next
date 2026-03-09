const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");

const IDENTIFICADOR = "imovel_anexos";

const ImovelAnexoRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        imovelId: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0,
            field: 'imovel_id'
        },
        discoId: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0,
            field: 'disco_id'
        },
        ordem: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 1,
            field: 'ordem'
        },
    },
    {
        timestamps: false,
        tableName: IDENTIFICADOR
    }
);

module.exports = { ImovelAnexoRepo };