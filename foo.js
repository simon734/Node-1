function Foo(name) {
	this.name = name;
	this.data = [1, 2, 3]; // setting a non-primitive property
};

Foo.prototype.showData = function () {
	console.log(this.name, this.data);
};

module.exports = Foo;