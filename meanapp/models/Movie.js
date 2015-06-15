var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title: String,
    url: String
});

module.exports = MovieSchema;