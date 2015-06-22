/**
 * Created by Cao Hong Phuoc on 6/22/2015.
 */
'use strict';

angular.module('categories').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/categories', {
                templateUrl: 'modules/categories/views/list-categories.client.view.html'
            }).
            when('/categories/create', {
                templateUrl: 'modules/categories/views/create-categories.client.view.html'
            }).
            when('/categories/:categoryId', {
                templateUrl: 'modules/categories/views/view-category.client.view.html'
            }).
            when('/categories/:categoryId/edit', {
                templateUrl: 'modules/categories/views/edit-categories.client.view.html'
            })
    }
])
