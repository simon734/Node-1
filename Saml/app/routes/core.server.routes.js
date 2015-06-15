'use strict';

var passport = require('passport');

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

	app.get('/user', function (req, res) {
		if (req.isAuthenticated()) {
			res.render('user', {
				user : req.user
			});
		} else {
			res.redirect('/login');
		}
	});

	app.get('/login', passport.authenticate('saml', {
		successRedirect : '/user',
		failureRedirect : '/login'
	}));

	app.post('/gears/saml/SSO/alias/defaultAlias', passport.authenticate('saml', {
			failureRedirect: '/',
			failureFlash: true
		}),
		function (req, res) {
			res.redirect('/user');
		}
	);

	app.get('/logout', function(req, res) {
		passport.logoutSaml(req, res);
	});

	app.get('/gears/saml/SingleLogout/alias/defaultAlias',
		function(req, res) {
			req.logout();
			res.redirect('/');
		}
	);
};
