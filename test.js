var http = require('http');
var url = require('url');
var fs = require('fs');

var messages = [];
var clients = [];

http.createServer(function (request, response) {
	var urlParts = url.parse(request.url);
	//console.log(urlParts);

	if (urlParts.pathname == '/') {
		fs.readFile('./index.html', function (err, contents) {
			response.end(contents);
		});
	} else if (urlParts.pathname.substr(0, 5) == '/poll') {
		var count = urlParts.pathname.replace(/[^0-9]*/, '');
		console.log(count);

		if (messages.length > count) {
			response.end(JSON.stringify({
					count : messages.length,
					append : messages.slice(count).join("\n") + "\n"
				}));
		} else {
			clients.push(response);
		}
	} else if (urlParts.pathname.substr(0, 5) == '/msg/') {
		var msg = unescape(urlParts.pathname.substr(5));
		messages.push(msg);
		while (clients.length > 0) {
			var client = clients.pop();
			client.end(JSON.stringify({
					count : messages.length,
					append : msg + "\n"
				}));
		}
		response.end();
	}

}).listen(8080, 'localhost');

console.log("Server running...");
