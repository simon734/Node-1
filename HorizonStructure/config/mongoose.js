'use strict';

var config = require('./config'),
	mongoose = require('mongoose'),
	path = require('path');

module.exports = function() {
	var db = mongoose.connect(config.db);

	// Globbing routing files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath));
	});
}
