/**
 * Created by Cao Hong Phuoc on 6/21/2015.
 */
angular.module('products').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/products', {
                templateUrl: 'modules/products/views/list-products.client.view.html'
            }).
            when('/products/create', {
                templateUrl: 'modules/products/views/create-product.client.view.html'
            }).
            when('/products/:productId', {
                templateUrl: 'modules/products/views/view-product.client.view.html'
            }).
            when('/products/:productId/edit',{
                templateUrl: 'modules/products/views/edit-product.client.view.html'
            })
    }
])
