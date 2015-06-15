'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	console.log('this is a test');
	res.render('index', {
		user: req.user || null,
		request: req
	});
};
