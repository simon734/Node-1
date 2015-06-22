/**
 * Created by Cao Hong Phuoc on 6/18/2015.
 */


var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller');

exports.create = function(req, res) {
    var newCategory = new Category(req.body);
    newCategory.save(function(err) {
        if (err) {
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            })
        } else {
            res.status(201).json(newCategory);
        }
    })
};

exports.read = function(req, res) {
    res.json(req.category);
};

exports.update = function(req, res) {
    var category = req.category;
    category = _.extend(req.body);
    category.save(function(err) {
        if (err) {
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            })
        } else {
            res.json(category);
        }
    })
};

exports.delete = function(req, res) {
    var category = req.category;

    category.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(category);
        }
    });
};

exports.list = function(req, res) {
    Category.find(function(err, categories) {
        if (err) {
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            })
        } else {
            res.json(categories);
        }
    })
};

exports.categoryById = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Category is valid'
        });
    }

    Category.findById(id, function(err, category) {
        if (err) return next(err);
        if (!category) {
            return res.status(400).send({
                message: 'Category not found'
            });
        }

        req.category = category;
        next();
    })

}
