import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'; // Import the package


console.log("ENV AMBIENT ->", process.env.SERVER_AMBIENT, " NODEENV ->", process.env.NODE_ENV);

const DB = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,
    dialectModule: mysql2, // Specify the mysql2 package as the dialect module
    logging: false,
    define: {
        timestamps: process.env.DATABASE_DEFINE_TIMESTAMPS,
        freezeTableName: true
    },
    dialectOptions: {
        charset: 'utf8mb4',
    },
    pool: {
        max: 5,
        min: 0,
        acquire: process.env.DATABASE_POOL_ACQUIRE,
        idle: process.env.DATABASE_POOL_IDLE
    }
});

const PK = {
    type: Sequelize.INTEGER(),
    autoIncrement: true,
    primaryKey: true
};


const oneToOne = (SchemaA, SchemaB, fk, as) => {
    SchemaB.hasMany(SchemaA, { foreignKey: fk, as });
    SchemaA.belongsTo(SchemaB, { foreignKey: fk, as });
}


const select = (query) => {
    return DB.query(query, {
        type: Sequelize.QueryTypes.SELECT,
    });
}

export {
    DB,
    PK,
    oneToOne,
    select
}