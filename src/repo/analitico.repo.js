const { DataTypes } = require("sequelize");
const { DB, PK } = require("../config/db");

const IDENTIFICADOR = "analiticos";

const AnaliticoRepo = DB.define(
    IDENTIFICADOR,
    {
        id: PK,
        tag: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'tag'
        },
        dataRef: {
            type: DataTypes.STRING(15),
            allowNull: false,
            defaultValue: 0,
            field: 'data_ref'
        },
        valor: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0,
            field: 'valor'
        }
    },
    {
        timestamps: false,
        tableName: IDENTIFICADOR,
        indexes: [
            {
                unique: true,
                fields: ['data_ref', 'tag']
            }
        ]
    }
);

module.exports = { AnaliticoRepo };