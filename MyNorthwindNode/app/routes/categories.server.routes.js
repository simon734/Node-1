/**
 * Created by Cao Hong Phuoc on 6/18/2015.
 */
'use strict';

var categories = require('../controllers/categories.server.controller'),
    user = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.get('/categories', categories.list);

    app.post('/categories', user.requiresLogin, categories.create);

    app.get('/categories/:categoryId', categories.read);
    app.put('/categories/:categoryId', user.requiresLogin, categories.update);
    app.delete('/categories/:categoryId', user.requiresLogin, categories.delete);

    app.param('categoryId', categories.categoryById);

}
