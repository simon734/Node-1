exports.login = function(req, res, next) {
    res.render('login');
};

exports.logout = function(req, res, next) {
    res.redirect('/');
};

exports.authenticate = function(req, res, next) {
    req.collections.users.findOne({
        email: req.body.email,
        password: req.body.password
    }, function(err, user) {
        if (err) return next(err);
        if (!user) {
            return res.render('login', {
                error: 'Login fail'
            })
        }

        req.session.user = user;
        req.session.admin = user.admin;
        res.redirect('/admin');
    });
};
