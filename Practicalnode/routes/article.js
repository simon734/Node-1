exports.list = function(req, res) {
    res.send('respond with a resource');
};

exports.show = function(req, res, next) {
    if (!req.params.slug) return next(new Error('No article slug.'));
    req.models.Article.findOne({
        slug: req.params.slug
    }, function(error, article) {
        if (error) return next(error);
        if (!article.published) return res.send(401);
        res.render('article', article);
    });
}

exports.list = function(req, res, next) {
    req.models.Article.find().exec(function(err, articles) {
        if (err) return next(err);
        res.send({
            articles: articles
        });
    })
}

exports.add = function(req, res, next) {
    if (!req.body.article) return next(new Error('no article'));

    var newArticle = req.body.article;
    req.models.Article.create(newArticle, function(err, articleResponse) {
        if (err) return next(err);
        res.send(articleResponse);
    });
};

exports.edit = function(req, res, next) {
    if (!req.params.id) return next(new Error('no article id'));
    var col = req.models.Article;
    col.updateById(req.params.id, {
        $set: req.body.article
    }, function(err, count) {
        if (err) return next(err);
        res.send({
            affectedCount: count
        });
    })
}

exports.del = function(req, res, next) {
    if (!req.params.id) return next(new Error('no article id'));
    var col = req.models.Article;
    col.removeById(req.params.id, function(err, count) {
        if (err) return next(err);
        res.send({
            affectedCount: count
        });
    })
};

exports.post = function(req, res, next) {
    res.render('post');
};

exports.postArticle = function(req, res, next) {
    if (!req.body.title || !req.body.slug || !req.body.text) {
        return res.render('post', {
            error: 'Fill title, slug and text.'
        });
    }
    var article = {
        title: req.body.title,
        slug: req.body.slug,
        text: req.body.text,
        published: false
    };
    req.models.Article.create(article, function(error, articleResponse) {
        if (error) return next(error);
        res.render('post', {
            error: 'Artical was added. Publish it on Admin page.'
        });
    });
};

exports.admin = function(req, res, next) {
    var col = req.models.Article;
    col.find().exec(function(err, articles) {
        if (err) return next(err);
        res.render('admin', {
            articles: articles
        });
    });
}
