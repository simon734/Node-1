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

    config.getGlobbedFiles('./env/database/*.js').forEach(function(routePath) {
        var hostConfig = require(path.resolve(routePath));
        console.log('connecting to ' + hostConfig.db);

        self[hostConfig.host] = {};

        var gear = mongoose.createConnection(hostConfig.db);
        require('./models/article')(gear);
        self[hostConfig.host].gear = gear;

        var history = gear.useDb('history');
        require('./models/user')(history);
        self[hostConfig.host].history = history;

        self[hostConfig.host].getModel = getModel;
    });
}