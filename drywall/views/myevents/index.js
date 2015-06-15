'use strict';

exports.find = function(req, res, next) {
	req.query.page = req.query.page ? parseInt(req.query.page, null) : 1;
	
	var query = {'username': req.user.username};
	
	req.app.db.models.Event.pagedFind({
		filters: query,
		keys : 'name username description',
		limit : 20,
		page : req.query.page,
		sort : '_id'
	}, function(err, results) {
		if (err) {
			return next(err);
		}
		
		res.render('myevents/index', {data: results.data});
	});
};