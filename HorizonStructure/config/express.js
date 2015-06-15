'use strict';

var express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	session = require('express-session'),
	config = require('./config'),
	path = require('path');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// config session
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'secret'
	}));

	// inti passport
	app.use(passport.initialize());
	app.use(passport.session());

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	app.use(express.static('./public'));

	return app;
}
