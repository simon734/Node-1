/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var User = require('mongoose').model('User'),
    errorHandler = require('./errors.server.controller');

module.exports.create = function(req, res) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.save(function(err) {
        if (err) {
            return errorHandler.sendError(err, res);
        }
        res.json(newUser);
    })
}

module.exports.renderAdminLogin = function(req, res) {
    res.render('admin/login');
}

module.exports.login = function(req, res) {
    User.findByUsername(req.body.username, function(err, user) {
        if (err) {
            return errorHandler.sendError(err, res);
        }

        if (!user) {
            res.render('admin/login', {
                message: 'Invalid User'
            });
        }

        if (user.authenticate(req.body.password)) {
            res.render('admin/index');
        } else {
            res.render('admin/login', {
                message: 'Wrong Password'
            });
        }
    });
}