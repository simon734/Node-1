'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var Test1Schema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: 'this is test 1'
	}
});

module.exports = function(db) {
	db.model('Test1', Test1Schema);
}
