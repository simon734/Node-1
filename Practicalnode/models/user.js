'use strict';

var mongoose = require('mongoose');

function validateEmail(value) {
    var emailRegex =
        /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    return (email.match(emailRegex) != null)
}

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        set: function(value) {
            return value.trim().toLowerCase()
        },
        validate: [
            validateEmail, 'Invalid email'
        ]
    },
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('User', userSchema);
