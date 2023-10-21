const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

app.use( cors() );
app.use( compression() );
app.use( helmet() );
app.use( express.json() );
app.use( express.text() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.raw() );


app.use(( req, res, next ) => {
    req.access_time = Date.now();

    next();
});

// TODO: Add all routes here

app.use(( err, req, res, next ) => {
    req.run_time = Date.now() - req.access_time;

    next();
});
app.use(( err, req, res, next ) => {
    res.statusCode( 500 );
    res.json({
        statusCode: 500,
        message: 'Server Error',
        runtime: req.run_time,
    });
});
