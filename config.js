require('dotenv').config({ path: '.env' });

module.exports.Config = {
    version: process.env.VERSION,

    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        port: process.env.DB_PORT,
    },
};
