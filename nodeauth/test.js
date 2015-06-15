var mongoose = require('mongoose');

var options = {
    server: {
		ssl: true,
		sslValidate: false,
        socketOptions: {
            keepAlive: 1
        }
    }
};

//options.server.ssl = true;
//options.server.sslCert = fs.readFileSync("/etc/ssl/mongoClient.pem");
//options.server.sslKey = fs.readFileSync("/etc/ssl/mongoClient.pem");     
//options.server.sslCA = fs.readFileSync("/etc/ssl/mongoServer.pem");   
//options.server.sslValidate = false;

mongoose.connect('mongodb://192.168.200.18/gear', options);

var db = mongoose.connection;

