exports.article = require('./article');
exports.user = require('./user');

exports.index = function(req, res, next) {
    req.models.Article.find().sort({
        _id: -1
    }).exec(function(err, articles) {
        if (err) return next(err);
        res.render('index', {
            articles: articles
        })
    })
}
