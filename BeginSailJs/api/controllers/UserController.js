/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports.hi = function(req, res) {
    return res.send("Hi there!");
};

module.exports.bye = function (req, res) {
    return res.redirect("http://www.sayonara.com");
};