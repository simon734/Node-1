'use strict';

var session = require('express-session');
var express = require('express');
var oauthserver = require('oauth2-server');
var bodyParser = require('body-parser');
var config = require('./config');
var path = require('path');
var fs = require('fs');
var https = require('https');
var passport = require('passport');

module.exports = function() {

	var app = express();

	// view engine setup
	app.set('views', './app/views');
	app.set('view engine', 'jade');

	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'secret'
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.oauth = oauthserver({
		model: require('./oauth'),
		grants: ['auth_code', 'password', 'authorization_code', 'refresh_token', 'client_credentials'],
		debug: true,
		authCodeLifetime: 1000,
		clientIdRegex: /^[a-z0-9-_]{3,100}$/i
	});

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	app.use(app.oauth.errorHandler());

	if (process.env.NODE_ENV === 'secure') {
		// Log SSL usage
		console.log('Securely using https protocol');

		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
		var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	return app;
};
