'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
require('./config/mongoose')();

// Init the express application
var app = require('./config/express')();

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
