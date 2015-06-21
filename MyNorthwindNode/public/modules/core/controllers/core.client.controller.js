/**
 * Created by Cao Hong Phuoc on 6/20/2015.
 */
angular.module('core').controller('CoreController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
        $scope.status = {
            isopen: false
        };

        $scope.toggled = function(open) {
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }
])
