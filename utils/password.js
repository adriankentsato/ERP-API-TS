/**
 * Created By: Kent Adrian Sato
 * Date: 10/21/2023
 */

const bcrypt = require('bcrypt');

const hash_password = ( pass, cb ) => {
    bcrypt.genSalt( 10 , ( err, salt ) => {
        if ( err || !salt ) { cb( new Error( 'Cannot hash password.' ) ); }
        else {
            bcrypt.hash( pass, salt, ( err, hashed ) => {
                if ( err || !hashed ) {
                    cb( new Error( 'Cannot hash password.') );
                } else {
                    cb( null, hashed.toString() );
                }
            });
        }
    });
};
module.exports.hash_password = hash_password;

const compare_password = ( pass_str, pass_hash, cb ) => {
    bcrypt.compare( pass_str, pass_hash, ( err, same ) => {
        if ( err ) { cb( new Error( 'Passwords not the same.' ) ); }
        else { cb( null, same ); }
    });
};
module.exports.compare_password = compare_password;
