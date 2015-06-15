'use strict';

var users = require('../controllers/users.server.controller'),
	articles = require('../controllers/articles.server.controller'),
	passport = require('passport');

module.exports = function(app) {

	app.route('/articles')
		.post(users.checkLogin, articles.create)
		.get(articles.list);

	app.route('/articles/:id')
		.get(articles.read)
		.delete(users.checkLogin, articles.delete)
		.put(users.checkLogin, articles.update);
}
