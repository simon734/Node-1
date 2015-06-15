var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
	res.render('addcategory', {
		"title": "Add Category",
	});
});

router.post('/add', function(req, res, next) {
	var title = req.body.title;
	
	req.checkBody('title', 'Title field is required').notEmpty();
	
	var db = req.db;
	var errors = req.validationErrors();
	if (errors) {
		res.render('addcategory', {
			"title": "Add Category"
		});
	} else {
		var newCategory = {
			'title': title
		};
		
		db.get('categories').insert(newCategory, function(err, category) {
			if (err) {
				res.send('There was an issue submitting the category');
			} else {
				req.flash('success','Category Submitted');
				res.redirect('/');
			}
		});
	}
});

router.get('/show/:category', function(req, res, next) {
	var category = req.params.category;
	var db = req.db;
	
	db.get('posts').find({'category': category}, {}, function(err, posts) {
		res.render('index', {
			'title': category,
			'posts': posts
		});
	});
});

module.exports = router;
