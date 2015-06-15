'use strict';

var passport = require('passport'), 
	SamlStrategy = require('passport-saml').Strategy, 
	config = require('../config');

module.exports = function() {

	var samlStrategy = new SamlStrategy({
		path : config.passport.saml.path,
		entryPoint : config.passport.saml.entryPoint,
		issuer : config.passport.saml.issuer,
		logoutUrl : config.passport.saml.logoutUrl
	}, function(profile, done) {
		var user = {
			nameID : profile.nameID,
			nameIDFormat : profile.nameIDFormat,
			_id : profile.id,
			email : profile.uid,
			firstName : profile.firstName,
			lastName : profile.lastName,
			company : profile.companyName,
			address : profile.address,
			city : profile.city,
			metascanLicenseKey : profile.MetaSOApiKey,
			licenseKey : profile.Gears,
			allowedToken : profile.GearsTokens,
			accountType : profile.GearsAccountType
		};

		return done(null, user);
	});

	passport.use(samlStrategy);

	passport.logoutSaml = function(req, res) {
		samlStrategy.logout(req, function(err, request) {
			if (!err) {
				res.redirect(request);
			}
		});
	};

};
