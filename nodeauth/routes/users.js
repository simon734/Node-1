var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{
  	'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login',{
  	'title': 'Login'
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findByUsernameAndPassword(username, password, function (err, user) {
		if (err) { return done(err); }
		
		if (user) {
			return done(null, user);
		} else {
			return done(null, false, { message: 'Incorrect username or password' });
		}
    });
  }
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', 
													   failureRedirect: '/users/login', 
													   failureFlash: 'Invalid username or password.' }));

router.post('/register', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var username = req.body.username;
	
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(password);
	req.checkBody('username', 'Username field is required').notEmpty();
	
	var errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			password: password,
			password2: password2,
			username: username
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			password: password,
			username: username
		});
		
		User.createUser(newUser, function(err, user) {
			if (err) throw err;
			console.log(user);
		});
		
		req.flash('success','You are now registered and may log in');
		
		res.redirect('/');
	}
});

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You have logged out.');
	res.redirect('/users/login');
});

module.exports = router;
