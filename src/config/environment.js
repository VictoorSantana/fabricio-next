


const config = {
    development: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASS: process.env.DATABASE_PASS,
        DATABASE_TYPE: process.env.DATABASE_TYPE,
        DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX,
        DATABASE_POOL_MIN: process.env.DATABASE_POOL_MIN,
        DATABASE_POOL_ACQUIRE: process.env.DATABASE_POOL_ACQUIRE,
        DATABASE_POOL_IDLE: process.env.DATABASE_POOL_IDLE,
        DATABASE_DEFINE_TIMESTAMPS: process.env.DATABASE_DEFINE_TIMESTAMPS,
    },
    production: {
        DATABASE_HOST: 'localhost',
        DATABASE_NAME: 'fabriciodb',
        DATABASE_USER: 'root',
        DATABASE_PASS: 'fab36411',
        DATABASE_TYPE: 'mysql',
        DATABASE_POOL_MAX: '5',
        DATABASE_POOL_MIN: '0',
        DATABASE_POOL_ACQUIRE: '30000',
        DATABASE_POOL_IDLE: '10000',
        DATABASE_DEFINE_TIMESTAMPS: 'false',
    }
}

export const getEnv = () => {
    const env = process.env.NODE_ENV || 'development';
    return config[env];
}