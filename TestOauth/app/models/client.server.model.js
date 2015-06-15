/**
 * @author Cao Hong Phuoc
 */
'use strict';

var mongoose = require('mongoose');

var OAuthClientsSchema = new mongoose.Schema({
	client_id : {
		type : String
	},
	client_secret : {
		type : String
	},
	callback_url : {
		type : String
	},
	account_id : String
}, {
	collection : 'tbl_clientapplication'
});

OAuthClientsSchema.virtual('clientId').get(function() {
	return this.client_id;
});
OAuthClientsSchema.virtual('clientSecret').get(function() {
	return this.client_secret;
});
OAuthClientsSchema.virtual('redirectUri').get(function() {
	return this.callback_url;
});
OAuthClientsSchema.virtual('username').get(function() {
	return this.account_id;
});
OAuthClientsSchema.set('toJSON', {
	virtuals : true
});

OAuthClientsSchema.statics.getClient = function (clientId, clientSecret, callback) {
	console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
	if (clientSecret === null) {
		return this.findOne({ client_id: clientId }, callback);
	}
	this.find({ client_id: clientId, client_secret: clientSecret }, callback);
};

OAuthClientsSchema.statics.findByClient = function(clientId, clientSecret, callback) {
	this.findOne({ client_id: clientId, client_secret: clientSecret }, callback);
}

module.exports = mongoose.model('OAuthClients', OAuthClientsSchema);
