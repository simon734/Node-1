/**
 * Created by Cao Hong Phuoc on 6/17/2015.
 */
'use strict';

var mongoose = require('mongoose');

function validateLength(value) {
    return value.length <= 15;
}

var CategorySchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    name: {
        type: String,
        default: '',
        unique: true,
        required: 'Name cannot be blank',
        validate: [validateLength, 'Name must be 15 chars in length or less']
    }
});

module.exports = mongoose.model('Category', CategorySchema);
