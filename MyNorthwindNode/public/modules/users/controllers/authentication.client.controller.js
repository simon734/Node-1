/**
 * Created by Cao Hong Phuoc on 6/20/2015.
 */
angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;
        $scope.user = Authentication.user;

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(res) {
                $scope.authentication.user = res;
                $location.path('/');
            }).error(function(res) {
                $scope.error = res.message;
            })
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(res) {
                $scope.authentication.user = res;
                $location.path('/');
            }).error(function(res) {
                $scope.error = res.message;
            });
        }
    }
])
