require('dotenv').config({
    silent: true
});

global.Promise = require('bluebird');

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    routes = require('../routes/api'),
    config = require('../configs/app.js');

app.use( cors() );
app.use( bodyParser.json() );
app.use('/api', routes);

app.listen(config.apiPort, '0.0.0.0', (err) => {
    if (err) throw err
    console.log('> Api is ready on http://localhost:' + config.apiPort);
});
