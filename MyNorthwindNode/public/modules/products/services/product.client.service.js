/**
 * Created by Cao Hong Phuoc on 6/22/2015.
 */
angular.module('products').factory('Products', ['$resource',
    function($resource) {
        return $resource('products/:productId', {
            productId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }
])
