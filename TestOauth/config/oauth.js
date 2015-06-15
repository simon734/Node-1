/**
 * Copyright 2013-present NightWorld.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var mongoose = require('mongoose'),
	OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
	OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens'),
	OAuthClientsModel = mongoose.model('OAuthClients'),
	OAuthAuthCodeModel = mongoose.model('OAuthAuthCode'),
	UserModel = mongoose.model('User');
 
//mongoose.set('debug', true);

module.exports.getAccessToken = function(bearerToken, callback) {
	OAuthAccessTokensModel.getAccessToken(bearerToken, callback);
};

module.exports.saveAccessToken = function (token, clientId, expires, user, callback) {
	console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + user.id + ', expires: ' + expires + ')');
	var accessToken = new OAuthAccessTokensModel({
		accessToken: token,
		clientId: clientId,
		userId: user.id,
		expires: expires
	});
	accessToken.save(callback);
};

module.exports.getClient = function (clientId, clientSecret, callback) {
	OAuthClientsModel.getClient(clientId, clientSecret, callback);
};

/*
 * Required to support refreshToken grant type
 */
module.exports.saveRefreshToken = function (token, clientId, expires, user, callback) {
	console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + user.id + ', expires: ' + expires + ')');
	var refreshToken = new OAuthRefreshTokensModel({
		refreshToken: token,
		clientId: clientId,
		userId: user.id,
		expires: expires
	});
	refreshToken.save(callback);
};

module.exports.getRefreshToken = function(refreshToken, callback) { 
	OAuthRefreshTokensModel.findByRefreshToken(refreshToken, callback);
};

module.exports.getAuthCode = function(authCode, callback) {
	OAuthAuthCodeModel.findByAuthCode(authCode, callback);
};

module.exports.saveAuthCode = function (authCode, clientId, expires, userId, callback) {
	console.log('in saveAuthCode (authCode: ' + authCode + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');
	var code = new OAuthAuthCodeModel({
		authCode: authCode,
		clientId: clientId,
		userId: userId,
		expires: expires
	});
	code.save(callback);
};

module.exports.getUserFromClient = function (clientId, clientSecret, callback) {
	OAuthClientsModel.findByClient(clientId, clientSecret, function (err, client) {
		if (err) return callback(err);
		UserModel.findById(client.account_id, callback);
	});
};

module.exports.grantTypeAllowed = function (clientId, grantType, callback) {
	callback(false, true);
};
