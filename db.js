/**
 * Created By: Kent Adrian Sato
 * Date: 10/21/2023
 */


const mysql = require('mysql2');

const { Config } = require('./config');

const pool = mysql.createPool({
    host: Config.db.host,
    user: Config.db.user,
    password: Config.db.pass,
    port: Config.db.port,
});

module.exports.ConnectionPool = pool;

