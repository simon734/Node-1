/**
 * @author Cao Hong Phuoc
 */
'use strict';

var mongoose = require('mongoose'), 
	config = require('./config'),
	path = require('path');

module.exports = function() {
	var db = mongoose.connect(config.db);
	
	//Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});
}
