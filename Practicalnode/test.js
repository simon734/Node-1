var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var session = require('express-session'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');



var app = express();

app.locals.appTitle = 'blog-express';

if ('development' === app.get('env')) {
    app.use(errorHandler());
}

app.use('/', function(req, res) {
    res.send('this is a test');
    process.exit(1);
})

var server = http.createServer(app);
var boot = function() {
    server.listen(3000, function() {
        console.info('Express server listening on port ' + 3000);
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
