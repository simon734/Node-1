'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto');

var modifierUrl = function(url) {
	if (!url) {
		return url;
	} else {
		if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
			url = 'http://' + url;
		}
		return url;
	}
}

var UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
	},
	username: {
		type: String,
		required: 'Username is required',
		trim: true
	},
	password: {
		type: String,
		validate: [
			function(password) {
				return password && password.length > 6;
			},
			'Password should be longer'
		]
	},
	salt: String,
	provider: {
		type: String,
		require: 'provider is required'
	},
	providerId: String,
	created: {
		type: Date,
		default: Date.now
	},
	providerData: {},
	website: {
		type: String,
		set: modifierUrl,
		get: modifierUrl
	}
});

UserSchema.virtual('fullName').get(function(argument) {
	return this.firstName + ' ' + this.lastName;
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.statics.findByUsername = function(username, callback) {
	this.findOne({
		'username': username
	}, callback);
}

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
}

UserSchema.statics.findByProvider = function(provider, providerId, callback) {
	this.findOne({
		'provider': provider,
		'providerId': providerId
	}, callback);
}

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('User', UserSchema);
