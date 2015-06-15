/**
 * @author Cao Hong Phuoc
 */
'use strict';

var User = require('mongoose').model('User'),
	errorHandler = require('./errors.server.controller'),
	requestUtils = require('../utils/request.utils');

module.exports.read = function(req, res) {
	var userId = requestUtils.getUserId(req);
	User.findById(userId, function(err, user) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		
		if (!user) {
			res.status(404).send({
				message: 'User can not found'
			});
		} else {
			res.json(user);
		}
	});
};
