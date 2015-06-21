/**
 * Created by Cao Hong Phuoc on 6/20/2015.
 */
angular.module('core').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'modules/core/views/home.client.view.html'
            }).
            otherwise({
                redirectTo: '/'
            })
    }
])
