'use strict';

var users = require('../controllers/users.server.controller'),
	articles = require('../controllers/articles.server.controller'),
	passport = require('passport');

module.exports = function(app) {

	app.route('/api/articles')
		.post(users.checkLogin, articles.create)
		.get(articles.list);

	app.route('/api/articles/:id')
		.get(articles.read)
		.delete(users.checkLogin, articles.delete)
		.put(users.checkLogin, articles.update);
}
