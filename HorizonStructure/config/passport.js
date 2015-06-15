'use strict';

var passport = require('passport'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	config = require('./config'),
	path = require('path');

module.exports = function() {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	// Globbing strategy files
	config.getGlobbedFiles('./config/strategies/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))();
	});
}
