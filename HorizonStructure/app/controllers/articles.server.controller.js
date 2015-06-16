'use strict';

var Article = require('mongoose').model('Article');

var gerErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			}
		}
	} else {
		return 'Unknown server error nha pa';
	}
};

module.exports.create = function(req, res, next) {
	var article = new Article(req.body);
	article.creator = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				'message': gerErrorMessage(err)
			})
		} else {
			res.json(article);
		}
	});
}

module.exports.list = function(req, res, next) {
	Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(
		function(err, articles) {
			if (err) {
				return res.status(400).send({
					'message': gerErrorMessage(err)
				});
			} else {
				res.json(articles);
			}
		});
}

module.exports.read = function(req, res, next) {
	var id = req.params.id;

	Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err,
		article) {
		if (err) {
			return res.status(400).send({
				'message': gerErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	})
}

module.exports.delete = function(req, res, next) {
	var id = req.params.id;

	Article.findByIdAndRemove(id, function(err, article) {
		if (err) {
			return next(err);
		} else {
			res.json(article);
		}
	})
}

module.exports.update = function(req, res, next) {
	var id = req.params.id;

	var update = {
		title: req.body.title,
		content: req.body.content
	}

	Article.findOneAndUpdate({
		'_id': id
	}, update, function(err, updatedArticle) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				'message': gerErrorMessage(err)
			});
		} else {
			res.json(updatedArticle);
		}
	})
}
