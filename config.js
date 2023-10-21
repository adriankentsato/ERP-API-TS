/**
 * Created By: Kent Adrian Sato
 * Date: 10/21/2023
 */


require('dotenv').config({ path: '.env' });

module.exports.Config = {
    version: process.env.VERSION,
    port: +process.env.PORT,

    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        port: process.env.DB_PORT,
    },

    jwt: {
        enc: process.env.JWT_ENC,
        exp: process.env.JWT_EXP,
    },
};
