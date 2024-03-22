const { Sequelize } = require('sequelize');
require('dotenv').config();
const pg = require('pg');
const mysql = require('mysql2')

let config;

if (process.env.NODE_ENV == 'production') {
    config = {
        dialect: 'postgres',
        database: process.env.SUPABASE_DATABASE,
        password: process.env.SUPABASE_DATABASE_PASSWORD,
        username: process.env.SUPABASE_USERNAME,
        port: process.env.SUPABASE_PORT,
        host: process.env.SUPABASE_HOST,
        getDialect: pg
    }
}
else {
    config = {
        dialect: 'postgres',
        database: process.env.POSTGRES_DATABASE_NAME,
        password: process.env.POSTGRES_PASSWORD,
        username: process.env.POSTGRES_USERNAME,
        port: process.env.POSTGRES_PORT,
        host: process.env.POSTGRES_HOST,
        getDialect: pg
    }
}

const db = new Sequelize(config)

module.exports = db;