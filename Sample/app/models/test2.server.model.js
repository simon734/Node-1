'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var Test2Schema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: 'this is test 2'
	}
});

module.exports = function(db) {
	db.model('Test2', Test2Schema);
}
