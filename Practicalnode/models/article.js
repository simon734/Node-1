var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        default: 'New Post'
    },
    text: String,
    published: {
        type: Boolean,
        default: false
    }
})

module.exports = function(db) {
    db.model('Article', articleSchema);
}
