/**
 * Created by Cao Hong Phuoc on 7/9/2015.
 */
'use strict';

/**
 * Created by Cao Hong Phuoc on 7/8/2015.
 */
'use strict';


var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

function getModel(modelName) {
    try {
        return this.gear.model(modelName);
    } catch(e) {
        return this.history.model(modelName);
    }
}

module.exports = {

}

module.exports.init = function() {
    var self = this;

    config.getGlobbedFiles('./config/env/database/*.js').forEach(function(routePath) {
        var hostConfig = require(path.resolve(routePath));
        console.log('connecting to ' + hostConfig.db);

        self[hostConfig.host] = {};

        var gear = mongoose.createConnection(hostConfig.db);
        require('../app/models/test1.server.model')(gear);
        self[hostConfig.host].gear = gear;

        var history = gear.useDb('history');
        require('../app/models/test2.server.model')(history);
        self[hostConfig.host].history = history;

        self[hostConfig.host].getModel = getModel;
    });
}