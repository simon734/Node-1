var db = require('./mongoose');
db.init();

var localhost = db['localhost'];

    var Article = localhost.getModel('Article');
    var article = new Article();
    console.log(article)
    article.save(function (err) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('article saved')
        }
    });

    var User = localhost.getModel('User');
    var user = new User();
    console.log(user)
    user.save(function (err) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('user saved')
        }
    });



