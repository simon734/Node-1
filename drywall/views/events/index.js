'use strict';

exports.find = function (req, res, next) {
	req.query.name = req.query.name ? req.query.name : '';
	req.query.limit = req.query.limit ? parseInt(req.query.limit, null) : 20;
	req.query.page = req.query.page ? parseInt(req.query.page, null) : 1;
	req.query.sort = req.query.sort ? req.query.sort : '_id';

	var filters = {};
	if (req.query.name) {
		filters.name = new RegExp('^.*?' + req.query.name + '.*$', 'i');
	}

	req.app.db.models.Event.pagedFind({
		filters : filters,
		keys : 'name username description',
		limit : req.query.limit,
		page : req.query.page,
		sort : req.query.sort
	}, function (err, results) {
		if (err) {
			return next(err);
		}

		results.filters = req.query;
		res.render('events/index', {data: results.data});
	});
};

exports.detail = function(req, res, next) {
	req.app.db.models.Event.findById(req.params.id, function(err, event) {
		if (err) {
			return next(err);
		}
		
		res.render('events/detail', {'event': event});
	});
};

exports.add = function(req, res, next) {
	res.render('events/add');
};

exports.create = function(req, res, next) {
	var workflow = req.app.utility.workflow(req, res);
	
	workflow.on('validate', function() {
		if (!req.body.name) {
			workflow.outcome.errors.push('Please enter a name.');
			return workflow.emit('response');
		}
		
		workflow.emit('createEvent');
	});
	
	workflow.on('createEvent', function() {
		var newEvent = {
			name: req.body.name,
			description: req.body.description,
			venu: req.body.venu,
			date: req.body.date,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			username: req.user.username
		};
		
		req.app.db.models.Event.create(newEvent, function(err, event) {
			if (err) {
				return workflow.emit('exception', err);
			}
			
			workflow.outcome.record = event;
			req.flash('success','Event Added');
			res.redirect('/events');
		});
	});
	
	workflow.emit('validate');
};

exports.edit = function(req, res, next) {
	var id = req.params.id;
	req.app.db.models.Event.findById(id, function(err, event) {
		if (err) {
			next(err);
		}
		
		res.render('events/edit', {
			'event': event
		});
	});
};

exports.update = function(req, res, next) {
	var workflow = req.app.utility.workflow(req, res);
	
	workflow.on('validate', function() {
		if (!req.body.name) {
			workflow.outcome.errors.push('Please enter a name.');
			return workflow.emit('response');
		}
		
		workflow.emit('updateEvent');
	});
	
	workflow.on('updateEvent', function() {
		var id = req.params.id;
		var update = {
			name: req.body.name,
			description: req.body.description,
			venu: req.body.venu,
			date: req.body.date,
			startTime: req.body.startTime,
			endTime: req.body.endTime
		};
		
		req.app.db.models.Event.findByIdAndUpdate(id, update, function(err, event) {
			if (err) {
				return workflow.emit('exception', err);
			}
			
			workflow.outcome.record = event;
			req.flash('success','Event Updated');
			res.redirect('/events/show/' + id);
		});
	});
	
	workflow.emit('validate');
};

exports.delete = function(req, res, next) {
	var id = req.params.id;
	
	req.app.db.models.Event.findByIdAndRemove(id, function(err, event) {
		if (err) {
			next(err);
		}
		res.send('Event Deleted');
	});
};
