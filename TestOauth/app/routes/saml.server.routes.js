'use strict';

var passport = require('passport'),
	controller = require('../../app/controllers/saml.server.controller');

module.exports = function(app) {

	app.get('/login', passport.authenticate('saml', {
		failureRedirect : '/login'
	}), controller.redirectAfterLogin);

	app.post('/gears/saml/SSO/alias/defaultAlias', passport.authenticate('saml', {
		failureRedirect: '/'
	}), controller.redirectAfterLogin);

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
