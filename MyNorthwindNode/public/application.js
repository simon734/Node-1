'use strict';

var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users',
	'core', 'products'
]);

mainApplicationModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function() {
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	angular.bootstrap(document, [mainApplicationModuleName]);
});
