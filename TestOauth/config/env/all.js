'use strict';

module.exports = {
	app: {
		title: 'Oauth',
		description: 'Full-Stack JavaScript with MongoDB, Express, and Node.js',
		keywords: 'MongoDB, Express, Node.js'
	},
	port: process.env.PORT || 3000,
	sessionSecret: 'Oauth',
	sessionCollection: 'sessions',
	passport: {
		strategy : 'saml',
		saml : {
			path : '/login/callback',
			entryPoint : 'https://accounts.opswat.com/auth/saml2/idp/SSOService.php',
			issuer : 'gears.opswat.com',
			logoutUrl: 'https://accounts.opswat.com/auth/saml2/idp/SingleLogoutService.php'
		}
	}
};
