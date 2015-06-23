/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var user = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.post('/users', user.create);

    app.get('/admin/login', user.renderAdminLogin);
}