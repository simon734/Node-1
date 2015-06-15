var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
	var db = req.db;
	db.get('categories').find({}, {}, function(err, categories){
		res.render('addpost', {
			"title": "Add Post",
			'categories': categories
		});
	});
});

router.post('/add', function(req, res, next) {
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body.author;
	
	req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();
	
	var db = req.db;
	var errors = req.validationErrors();
	if (errors) {
		db.get('categories').find({}, {}, function(err, categories){
			res.render('addpost', {
				'errors': errors,
				'title': title,
				'category': category,
				'body': body,
				'author': author,
				'categories': categories
			});
		});
	} else {
		var newPost = {
			'title': title,
			'category': category,
			'body': body,
			'author': author
		};
		
		db.get('posts').insert(newPost, function(err, post) {
			if (err) {
				res.send('There was an issue submitting the post');
			} else {
				req.flash('success','Post Submitted');
				res.redirect('/');
			}
		});
	}
});

router.get('/show/:id', function(req, res, next) {
	var id = req.params.id;
	var db = req.db;
	
	db.get('posts').findById(id, function(err, post) {
		res.render('show', {
			'post': post
		});
	});
});

router.post('/addcomment', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var body = req.body.body;
	var postid = req.body.postid;
	
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();
	req.checkBody('email', 'Email field is invalid').isEmail();
	req.checkBody('postid', 'postid field is required').notEmpty();
	
	var db = req.db;
	var errors = req.validationErrors();
	if (errors) {
		db.get('posts').findById(postid, function(err, post){
			res.render('show', {
				'errors': errors,
				'post': post
			});
		});
	} else {
		var query = {'_id': postid};
		var update = {$push:{'comments': 
			{
			'name': name,
			'email': email,
			'body': body
			}
		}};
		
		db.get('posts').update(query, update, function(err, doc) {
			if (err) {
				throw err;
			} else {
				req.flash('success','Comment Added');
				res.redirect('/posts/show/' + postid);
			}
		});
	}
});

module.exports = router;
