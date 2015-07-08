/**
 * Created by Cao Hong Phuoc on 7/8/2015.
 */
'use strict';

module.exports = function(callback) {
    var mongoose = require('mongoose');

    var dbUrl = 'mongodb://192.168.1.119/db1';
    var db1 = mongoose.createConnection(dbUrl, function(err) {
        if (err) {
            console.log(err.stack )
        } else {
            console.log('connected')
            require('./models/article')(db1);

            var db2 = db1.useDb('db2');
            require('./models/user')(db2);

            callback(db1, db2);
        }
    });


    return mongoose;
}