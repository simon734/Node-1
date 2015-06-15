/**
 * @author Cao Hong Phuoc
 */
'use strict';

var mongoose = require('mongoose');

var OAuthAccessTokensSchema = new mongoose.Schema({
	accessToken : {
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

OAuthAccessTokensSchema.statics.getAccessToken = function (bearerToken, callback) {
	console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');
	this.findOne({ accessToken: bearerToken }, callback);
};

module.exports = mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
