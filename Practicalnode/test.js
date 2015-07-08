require('./mongoose')(function(db1, db2) {
    var mongoose = require('mongoose');
    var Article = db1.model('Article');
    var article = new Article();
    console.log(article)
    article.save(function (err) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('article saved')
        }
    });

    var User = db2.model('User');
    var user = new User();
    console.log(user)
    user.save(function (err) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('user saved')
        }
    });
});



