var express = require('express'),
	mongoose = require('mongoose');

var app = express();

var db = mongoose.connect('mongodb://katanhich:catanhi@ds031952.mongolab.com:31952/testnode');
var BookModel = require('./models/bookModel');

var bookRouter = express.Router();
bookRouter.route('/books')
	.get(function (req, res) {
		BookModel.find(req.query, function (err, books) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(books);
			}
		})
	});

bookRouter.route('/books/:id')
	.get(function (req, res) {
		var id = req.params.id;
		BookModel.findById(id, function (err, book) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(book);
			}
		})
	})

app.get('/', function (req, res) {
	res.send('Hello World');
})
app.use('/api', bookRouter);

app.listen(3000);

console.log('Running...')
