'use strict';

module.exports = function (app) {
    var categories = require('../../app/controllers/categories.server.controller');

    app.route('/categories')
        .get(categories.list)
        .post(categories.create);

    app.route('/categories/:id')
        .get(categories.read)
        .put(categories.update)
        .delete(categories.delete);

};