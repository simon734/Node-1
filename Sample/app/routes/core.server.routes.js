'use strict';

var db = require('../../config/database');

module.exports = function(app) {
	// Root routing

    app.get('/init', function(req, res) {
        var Test1 = db['beta'].getModel('Test1');
        var test1 = new Test1();
        test1.save(function() {
            var Test2 = db['beta'].getModel('Test2');
            var test2 = new Test2();
            test2.save(function() {
                res.send('seccuss')
            });
        });
    })

	app.get('/test1', function(req, res) {
        var test1 = db['beta'].getModel('Test1');
        test1.find(function(err, result) {
            res.json(result);
        });
    });

    app.get('/test2', function(req, res) {
        var test2 = db['beta'].getModel('Test2');
        test2.find(function(err, result) {
            res.json(result);
        });
    });

};