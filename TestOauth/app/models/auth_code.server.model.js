/**
 * @author Cao Hong Phuoc
 */
'use strict';

var mongoose = require('mongoose');

var OAuthAuthCodeSchema = new mongoose.Schema({
	authCode : {
		type : String
	},
	clientId : {
		type : String
	},
	userId : {
		type : String
	},
	expires : Date
});

OAuthAuthCodeSchema.statics.findByAuthCode = function(authCode, callback) {
	this.findOne({authCode: authCode}, callback);
};

module.exports = mongoose.model('OAuthAuthCode', OAuthAuthCodeSchema);
