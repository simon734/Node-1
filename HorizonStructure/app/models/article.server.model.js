'use strict';

var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		trim: true,
		default: '',
		required: 'Title can not be blank'
	},
	content: {
		type: String,
		trim: true,
		default: '',
	},
	creator: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Article', ArticleSchema);
