require('dotenv').config({
    silent: true
});

global.Promise = require('bluebird');

const express = require('express'),
    app = express(),
    routes = require('../routes/api'),
    config = require('../configs/app.js');

app.use('/api', routes);

app.listen(config.apiPort, '0.0.0.0', (err) => {
    if (err) throw err
    console.log('> Api is ready on http://localhost:' + config.apiPort);
});
