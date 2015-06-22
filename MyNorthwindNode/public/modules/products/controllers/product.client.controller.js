/**
 * Created by Cao Hong Phuoc on 6/21/2015.
 */
angular.module('products').controller('ProductController', ['$scope', '$routeParams', '$location',
    'Authentication', 'Products', 'Categories', '$http',
    function($scope, $routeParams, $location, Authentication, Products, Categories, $http) {
        $scope.authentication = Authentication;

        if (!Authentication.user) $location.path('/');

        $scope.create = function() {
            var product = new Products({
                name: this.name,
                category: this.categoryId
            });

            product.$save(function(res) {
                $location.path('products');
            }, function(res) {
                $scope.error = res.data.message;
            })
        }

        $scope.find = function() {
            $scope.products = Products.query();
        }

        $scope.findCategories = function() {
            $scope.categories = Categories.query();
            console.log($scope.categories)
        }
    }
])
