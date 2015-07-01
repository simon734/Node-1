/**
 * Created by Cao Hong Phuoc on 6/27/2015.
 */
'use strict';

module.exports = function(app) {
    app.get('uploadfile', function(req, res) {
        res.render('uploadfile');
    });
}