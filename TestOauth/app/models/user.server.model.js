/**
 * @author Cao Hong Phuoc
 */
'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	_id: String,
	email: String,
	firstname: String,
	lastname: String,
	jobrole: String,
	jobtitle: String,
	phone: String,
	company: String
}, {collection: 'tbl_user'});

module.exports = mongoose.model('User', UserSchema);
