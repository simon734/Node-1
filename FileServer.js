var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var mimeTypes = {
	'html' : 'text/html',
	'css' : 'text/css',
	'jpg' : 'image/jpeg',
	'js' : 'text/javascript'
}

http.createServer(function(req, res) {
	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(), unescape(uri));
	
	console.log('Loading ' + fileName + '...');
	
	var stats;
	try {
		stats = fs.lstatSync(fileName);
	} catch(e) {
		res.writeHead(404, {'Content-type' : 'text/plain'});
		res.write('404 Not Found');
		res.end();
	}
	
	if (stats.isFile()) {
		var mime = mimeTypes[path.extname(fileName).split('.')[1]];
		res.writeHead(200, {'Content-type' : mime});
		
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	} else if (stats.isDirectory()){
		res.writeHead(302, {'Location' : 'index.html'});
		res.end();
	} else {
		res.writeHead(500, {'Content-type' : 'text/plain'});
		res.write('Internal server error');
		res.end();
	}
	
	console.log('\n\n');
}).listen(80);

console.log('Server is running...');