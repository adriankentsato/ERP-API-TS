/**
 * Created By: Kent Adrian Sato
 * Date: 10/21/2023
 */

const jwt = require('jsonwebtoken');
const { Config } = require('../config');

const generate_token = ( id, expiry ) => {
    return jwt.sign( { id }, Config.jwt.enc, { expiresIn: expiry } );
};

module.exports.generate_token = generate_token;
