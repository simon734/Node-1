var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoskin = require('mongoskin');

var session = require('express-session'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var dbUrl = 'mongodb://katanhich:catanhi@ds047742.mongolab.com:47742/blog';
var db = mongoskin.db(dbUrl, {
    safe: true
});
var collections = {
    articles: db.collection('articles'),
    users: db.collection('users')
}

var app = express();

app.locals.appTitle = 'blog-express';

app.use(function(req, res, next) {
    req.collections = collections;
    next();
})

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'secret'
}));
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
    app.use(errorHandler());
}

app.use(function(req, res, next) {
    if (req.session && req.session.admin) {
        res.locals.admin = true;
    }
    next();
});

var authorize = function(req, res, next) {
    if (req.session && req.session.admin) {
        next();
    } else {
        res.send(401);
    }
}

//PAGES&ROUTES
app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin', authorize, routes.article.admin);
app.get('/post', authorize, routes.article.post);
app.post('/post', authorize, routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

//REST API ROUTES
app.all('/api', authorize, routes.article.list)
app.get('/api/articles', routes.article.list)
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);

// 404 error
app.all('*', function(req, res) {
    res.send(404);
})

app.all('*', function(req, res) {
    res.render('index', {
        msg: 'Welcome to the Practical Node.js!'
    })
})

// http.createServer(app).listen(app.get('port'), function(){
// console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);
var boot = function() {
    server.listen(app.get('port'), function() {
        console.info('Express server listening on port ' + app.get('port'));
    });
}
var shutdown = function() {
    server.close();
}
if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module')
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}
