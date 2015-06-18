/**
 * Created by Cao Hong Phuoc on 6/17/2015.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

function validateLength(value) {
    return value.length <= 40;
}

var ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
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
        trim: true,
        unique: true,
        required: 'Name cannot be blank',
        validate: [validateLength, 'Name must be 40 chars in length or less']
    },
    quantityPerUnit: String,
    unitPrice: {
        type: Number,
        default: 0
    },
    unitsInStock: {
        type: Number,
        default: 0,
        min: 0
    },
    unitsOnOrder: {
        type: Number,
        default: 0,
        min: 0
    },
    discontinued: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', ProductSchema);
