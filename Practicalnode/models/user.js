'use strict';

var Schema = require('mongoose').Schema;

var userSchema = new Schema({
    email: {
        type: String,
        default: 'this is a test'
    },
    password: String,
    admin: {
        type: Boolean,
        default: true
    }
});

module.exports = function(db) {
    db.model('User', userSchema);
};
