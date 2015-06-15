var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
	res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'katanhich@gmail.com',
			pass: 'b1ad3ma573r'
		}
	});
	
	var mailOptions = {
		from: 'Phuoc dap trai <katanhich@gmail.com>',
		to: 'katanhich@gmail.com',
		subject: 'Test Node.Js',
		text: 'You have a new submission...Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
		html: '<p>You have a new submission...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
	};
	
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message: ' + info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
