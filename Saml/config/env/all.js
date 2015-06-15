'use strict';

module.exports = {
	app: {
		title: 'Saml',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
			],
			js: [
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	},
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
