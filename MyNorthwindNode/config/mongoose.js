/**
 * Created by pcao on 6/18/2015.
 */
'use strict';

var mongoose = require('mongoose'),
    path = require('path'),
    config = require('./config');

module.exports = function() {
    mongoose.connect(config.db, function(err) {
        if (err) {
            console.log('Could not connect to MongoDB!');
        } else {
            console.log('Connected to MongoDB!');
        }
    });

    // Globbing model files
    config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });
}
