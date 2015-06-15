/**
 * @author Cao Hong Phuoc
 */
'use strict';

var mongoose = require('mongoose');

var OAuthRefreshTokensSchema = new mongoose.Schema({
	refreshToken : {
		type : String
	},
	clientId : {
		type : String
	},
	userId : {
		type : String
	},
	expires : {
		type : Date
	}
});

OAuthRefreshTokensSchema.statics.findByRefreshToken = function (refreshToken, callback) {
	console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');
	this.findOne({ refreshToken: refreshToken }, callback);
};

module.exports = mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
