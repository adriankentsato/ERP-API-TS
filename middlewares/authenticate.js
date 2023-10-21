/**
 * Created By: Kent Adrian Sato
 * Date: 10/21/2023
 */

const jwt = require('jsonwebtoken');
const { Config } = require('../config');
const { EResponse } = require('../utils/response');
const { ConnectionPool } = require('../db');

const authenticate = ( req, res, next ) => {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify( token, Config.jwt.enc, ( err, decoded ) => {
        if ( err ) { next( new EResponse( 401, 'Unauthorized' ) ); }
        else {
            validateUser( decoded.id, ( err, user ) => {
                if ( err ) { next( new EResponse( 401, 'Unauthorized' ) ); }
                else {
                    req.current_user = user;

                    next();
                }
            });
        }
    });
};

const validateUser = ( id, cb ) => {
    ConnectionPool.getConnection(( err, conn ) => {
        if ( err ) { cb( err ); }
        else {
            conn.query('SELECT * FROM Users WHERE id = ?', [ id ], ( err, res ) => {
                ConnectionPool.releaseConnection( conn );

                if ( err || res.length === 0 ) {
                    cb( err || new Error( 'User not found.' ) );
                } else {
                    cb( null, res[ 0 ] );
                }
            });
        }
    });
};

module.exports.Authenticate = authenticate;
