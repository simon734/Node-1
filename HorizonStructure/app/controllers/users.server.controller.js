'use strict';

var User = require('../models/user.server.model'),
	passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username co roi cha noi';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}

	return message;
}

module.exports.renderSingin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			//messages: req.flash('error') || req.flash('info')
		})
	} else {
		res.redirect('/');
	}
}

module.exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			//messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

module.exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);

		user.provider = 'local';

		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				//req.flash('error', message);
				console.log(getErrorMessage(err));
				return res.redirect('/signup');
			}

			req.login(user, function(err) {
				if (err) {
					console.log(getErrorMessage(err));
					return next(err);
				} else {
					res.redirect('/');
				}
			})
		});
	} else {
		res.redirect('/');
	}
}

module.exports.signout = function(req, res, next) {
	req.logout();
	res.redirect('/');
}

module.exports.create = function(req, res, next) {
	var newUSer = new User(req.body);
	newUSer.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(newUSer);
		}
	});
}

module.exports.list = function(req, res, next) {
	User.find(function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	})
}

module.exports.read = function(req, res, next) {
	var id = req.params.id;

	User.findById(id, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	})
}

module.exports.delete = function(req, res, next) {
	var id = req.params.id;

	User.findByIdAndRemove(id, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	})
}

module.exports.update = function(req, res, next) {
	var id = req.params.id;

	User.update({
		'_id': id
	}, req.body, function(err) {
		if (err) {
			return next(err);
		} else {
			res.send('updated');
		}
	})
}

module.exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findByProvider(profile.provider, profile.providerId, function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] :
					'test');
				User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
					profile.username = availableUsername;
					user = new User(profile);

					user.save(function(err) {
						if (err) {
							return done(null, false, {
								message: 'Invalid passport'
							});
						} else {
							return done(err, user);
						}
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
}

module.exports.checkLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	} else {
		next();
	}
}
