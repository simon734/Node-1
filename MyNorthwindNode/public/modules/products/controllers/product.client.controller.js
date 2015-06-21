/**
 * Created by Cao Hong Phuoc on 6/21/2015.
 */
angular.module('products').controller('ProductController', ['$scope', '$routeParams', '$location',
    'Authentication',
    function($scope, $routeParams, $location, Authentication) {
        $scope.authentication = Authentication;

        if (!Authentication.user) $location.path('/');
    }
])
