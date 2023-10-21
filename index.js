const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { Config } = require('./config');
const { ConnectionPool } = require('./db');
const app = express();

app.use( cors() );
app.use( compression() );
app.use( helmet() );
app.use( express.json() );
app.use( express.text() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.raw() );
app.use( morgan('dev') );


app.use(( req, res, next ) => {
    req.access_time = Date.now();

    next();
});

// TODO: Add all routes here
app.use(( err, req, res, next ) => {
    if ( req.db_connection ) {
        // TODO : Check for transaction, commit/revert accordingly
        ConnectionPool.releaseConnection( req.db_connection );
    }

    next( err );
});

app.use(( err, req, res, next ) => {
    req.run_time = Date.now() - req.access_time;

    next( err );
});
app.use(( err, req, res, next ) => {
    res.status( 500 );
    res.json({
        statusCode: 500,
        message: 'Server Error',
        runtime: req.run_time,
    });
});

app.listen( Config.port, () => {
    console.log(`Server listening to http://localhost:${ Config.port }`);
});
