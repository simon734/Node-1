'use strict';

var users = require('../controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {

	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.route('/users/:id')
		.get(users.read)
		.delete(users.delete)
		.put(users.update);

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSingin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin'
		}));

	app.get('/signout', users.signout);

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));

	app.get('/oauth/google', passport.authenticate('google', {
		failureRedirect: '/signin',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));

	app.get('/oauth/google/callback', passport.authenticate('google', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));
}
