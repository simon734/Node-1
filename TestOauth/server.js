'use strict';

process.env.NODE_ENV = 'secure';

var mongoose = require('mongoose'),
	config = require('./config/config');

// start mongoose
require('./config/mongoose')();

// init express application
var app = require('./config/express')();

// start passport saml
require('./config/passport')();

app.listen(config.port);

console.log('Running on ' + config.port);

module.exports = app;
