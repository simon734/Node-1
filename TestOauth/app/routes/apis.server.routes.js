'use strict';

var users = require('../controllers/users.server.controller');

module.exports = function(app) {
	app.get('/secret', app.oauth.authorise(), function(req, res) {
		// require a valid access_token
		console.log(req.oauth);
		res.send('Secret area');
	});

	app.get('/public', function(req, res) {
		// Does not require an access_token
		res.send('Public area');
	});
	
	app.get('/api/user', app.oauth.authorise(), users.read);
	
};