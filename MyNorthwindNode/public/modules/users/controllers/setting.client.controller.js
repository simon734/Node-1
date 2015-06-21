/**
 * Created by Cao Hong Phuoc on 6/20/2015.
 */
angular.module('users').controller('SettingController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.user = Authentication.user;

        $scope.update = function() {
            $http.post('')
        }
    }
])
