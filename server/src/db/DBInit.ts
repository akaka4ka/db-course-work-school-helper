import pkg, { PoolConfig } from 'pg';

const { Pool } = pkg;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = +process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || 'postgres'; //nodejsDB
const DB_PASSWORD = process.env.DB_PASSWORD || '2255'; //nodejs2255
const DB_DATABASE = process.env.DB_DATABASE || 'postgres';

const config: PoolConfig = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
};

const pool = new Pool(config);

export default pool;
