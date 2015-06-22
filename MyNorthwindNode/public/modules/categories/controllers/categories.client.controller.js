/**
 * Created by Cao Hong Phuoc on 6/22/2015.
 */

'use strict';

angular.module('categories').controller('CategoryController', ['$scope', '$routeParams', '$location', 'Authentication',
    'Categories',
    function($scope, $routeParams, $location, Authentication, Categories) {
        $scope.authentication = Authentication;

        if (!Authentication.user) $location.path('/');

        $scope.create = function() {
            var newCategory = new Categories({
                name: this.name,
                description: this.description
            });

            newCategory.$save(function() {
                $location.path('/categories');
            }, function(err) {
                $scope.error = err.data.message;

            });
        };

        $scope.find = function() {
            $scope.categories = Categories.query();
        }

        $scope.findOne = function() {
            $scope.category = Categories.get({
                categoryId: $routeParams.categoryId
            });
        }
    }
]);
