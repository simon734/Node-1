(function() {
    var app = angular.module('store', []);

    app.directive('productPanels', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-panels.html',
            controller: function() {
                this.tab = 1;

                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };

                this.isSelected = function(checkTab) {
                    return this.tab === checkTab;
                };
            },
            controllerAs: 'panel'
        }
    });

    app.directive('productTitle', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-title.html'
        }
    })

    app.controller('StoreController', function() {
        this.products = gems;
    });

    app.controller('ReviewController', function() {
        this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review);
            this.review = {};
        }
    })

    var gems = [{
        name: 'Phuoc',
        price: 3,
        description: 'this is a test',
        canPurchase: false,
        reviews: [{
            stars: 5,
            body: 'I love this product',
            author: 'phuoc'
        }, {
            stars: 10,
            body: 'I love this product',
            author: 'phuoc'
        }, {
            stars: 2,
            body: 'I love this product',
            author: 'phuoc'
        }]
    }, {
        name: 'Vy Nguyen',
        price: 5,
        description: 'this is a test',
        canPurchase: false,
        reviews: [{
            stars: 5,
            body: 'I love this product',
            author: 'vy'
        }, {
            stars: 1,
            body: 'I love this product',
            author: 'vy'
        }, {
            stars: 7,
            body: 'I love this product',
            author: 'uoc'
        }]
    }]
})();
