/**
 * @author Cao Hong Phuoc
 */
'use strict';

exports.getUserId = function(req) {
	return req.oauth.bearerToken.userId;
};