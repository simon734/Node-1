'use strict';

exports = module.exports = function(app, mongoose) {
	var schema = new mongoose.Schema({
		name: {type: String, required: true},
		description: String,
		venu: String,
		date: Date,
		startTime: String,
		endTime: String,
		username: {type: String, required: true},
		search: [String]
	});
	
	schema.plugin(require('./plugins/pagedFind'));
	schema.set('autoIndex', (app.get('env') === 'development'));
	app.db.model('Event', schema);
};
