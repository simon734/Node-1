'use strict';

var mongoose = require('mongoose');

function validateLength(text) {
    return text.length <= 15;
}

var CategorySchema = new mongoose.Schema({
    created: {
        type: Date, default: Date.now
    },
    description: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'name can not be blank',
        validate: [validateLength, 'name must be 15 chars in length or less']
    }
});

mongoose.model('Category', CategorySchema);