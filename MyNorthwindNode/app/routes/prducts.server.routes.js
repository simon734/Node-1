/**
 * Created by Cao Hong Phuoc on 6/18/2015.
 */
'use strict';

var products = require('../controllers/products.server.controller'),
    user = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.get('/products', products.list);

    app.post('/products', user.requiresLogin, products.create);

    app.get('/categories/:categoryId', products.read);
    app.put('/categories/:categoryId', user.requiresLogin, products.update);
    app.delete('/categories/:categoryId', user.requiresLogin, products.delete);

    app.param('productId', products.productByID);

}
