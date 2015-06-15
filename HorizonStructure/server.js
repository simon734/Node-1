'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var config = require('./config/config');

// start mongoose
require('./config/mongoose')();

// init express
var app = express();

// init all passport strategy
require('./config/passport')();

app.listen(config.port);

console.log('Running on ' + config.port);

module.exports = app;
