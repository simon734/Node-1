'use strict';

var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Category = mongoose.model('Category'),
    _ = require('lodash');

exports.list = function (req, res) {
    Category.find(function (err, categories) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(categories);
        }
    });
};

exports.create = function (req, res) {
    var category = new Category(req.body);

    category.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(category);
        }
    });
};

exports.update = function (req, res) {
    var categoryId = req.params.id;

    Category.update({ '_id': categoryId }, req.body, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.send('category updated');
        }
    });
};

exports.read = function (req, res) {
    var categoryId = req.params.id;

    Category.findById(categoryId, function (err, category) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } 
        
        if (!category) {
            return res.status(404).send({
                message: 'Category not found'
            });
        } else {
            res.json(category);
        }
    });
};

exports.delete = function(req, res) {
    var categoryId = req.params.id;

    Category.remove({ '_id': categoryId }, function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.send('category deleted');
        }
    });
};