var express = require('express');
var router = express.Router();
var session = require('express-session')
var cookieParser = require('cookie-parser')

var messagemodel = require('../model/messagemodel');
var usermodel = require('../model/usermodel');

router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!", cookie: {maxAge: 360000}}));

/* GET home page. */
router.get('/', function(req, res) {
	if(req.session.username) {
		res.redirect('/dashboard');
	}
	else{
		var message = "";
  		res.render('users', {message:message, username:req.session.username});
	}
});

router.get('/logout', function(req, res, next){
	req.session.destroy(function(error){
		if (error) {
			res.redirect('/logout?error');
		}
		else{
			res.redirect('/');
		}
	});
});

router.get('/register', function(req, res, next){
	res.render('register');
});

router.post('/registerdata', function(req, res, next){
	console.log("login data", req.body);
	var inputfielddata = {
		uname : req.body.uname,
		email : req.body.email,
		mob : req.body.mob,
		pass : req.body.pass
	}	
	messagemodel.userAdd(inputfielddata, function(error, result){
		if (error) {
			var msg = "Wrong input";
			res.redirect('/register?error'+msg);
		}
		else{
			res.redirect('/')
		}
	});
});

router.post('/', function(req,res, next){
	console.log("lets see", req.body);
	usermodel.usersLogin(req.body, function(error, data){
		console.log("data of req body", data);
		if (data === false || data === null || data == '') {
			var message = "Wrong username and password.";
			res.render('users', {message:message});
			console.log("errrr", message);
		}
		else{
			req.session.username = data[0].username;
			console.log(req.session);
			res.redirect('/dashboard');
		}
	});
});

router.use(function(req, res, next){
	if (req.session.username || req.path === '/') {
		next();
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;
