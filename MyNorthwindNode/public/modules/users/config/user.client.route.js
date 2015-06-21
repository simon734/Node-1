/**
 * Created by Cao Hong Phuoc on 6/20/2015.
 */
'use strict';

angular.module('users').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/signin', {
                templateUrl: 'modules/users/views/signin.client.view.html'
            }).
            when('/signup', {
                templateUrl: 'modules/users/views/signup.client.view.html'
            }).
            when('/settings/profile', {
                templateUrl: 'modules/users/views/edit.client.view.html'
            }).
            when('/settings/accounts', {
                templateUrl: 'modules/users/views/account.client.view.html'
            }).
            when('/settings/password', {
                templateUrl: 'modules/users/views/password.client.view.html'
            })
    }
])
