var Foo = require("./foo.js");
var util = require('util');

function Bar(name) {
	Foo.call(this, name);
}
util.inherits(Bar, Foo);

Bar.prototype.showDataBar = function() {
  console.log("showDataBar");
};

module.exports = Bar;