'use strict';

var controller = require('../../app/controllers/oauth.server.controller');

module.exports = function (app) {

	app.all('/oauth/token', app.oauth.grant());

	app.get('/oauth/authorise', controller.renderAuthorizePage);

	app.post('/oauth/authorise', function (req, res, next) {
	  	if (!req.user) {
	    	return res.redirect('/login');
	  	}

	  	next();

	}, app.oauth.authCodeGrant(function (req, next) {
		// The first param should to indicate an error
		// The second param should a bool to indicate if the user did authorise the app
		// The third param should for the user/uid (only used for passing to saveAuthCode)
		next(null, req.body.allow === 'yes', req.user._id);
	}));
};