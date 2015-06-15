var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.200.18/nodeauth', {
    server: {
		ssl: true,
		sslValidate: false,
        socketOptions: {
            keepAlive: 1
        }
    }
});
var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	name: String
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(user, callback) {
	user.save(callback);
};

module.exports.findByUsernameAndPassword = function(username, password, callback) {
	var query = {username: username, password: password};
	User.findOne(query, callback);
};

