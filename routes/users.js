var express = require('express');
var router = express.Router();

var messagemodel = require('../model/messagemodel');
/* GET users listing. */
router.get('/dashboard', function(req, res) {
	messagemodel.showMessage(function(error, result){
		if (error) {
			res.render('dashboard', {error:error});
		}
		else{
  			res.render('index', {data:result, username: req.session.username});
		}
		console.log("showMessagesss", result);
	});
});

router.post('/message', function(req, res, next){
	console.log("message", req.body);	
	var inputfielddata1 = {
		msg : req.body.msg,
		sts : '0'
	}
	messagemodel.addMessage(inputfielddata1, function(error, result){
		if (error) {
			var msg = "Wrong input";
			res.redirect('/message?'+msg);
		}
		else{
			res.redirect('/dashboard');
		}
	});
});

router.get('/delete', function(req, res, next){
	var mid = req.query.deleteid;
	var sts = '0'
	console.log("id of delete",mid);
	messagemodel.deleteMessage(mid, function(error, result){
		res.redirect('/dashboard');
	});
});


router.get('/update', function(req, res, next){
	var mid = req.query.updateid;

	messagemodel.getUpdateId(mid, function(error, result){
		if (error) {
			res.render('updatemsg', {error:error});
		}
		else{
			res.render('updatemsg', {data:result});
		}
	});
});

router.post('/messageupdatedata', function(req, res, next){
	console.log("req body datra", req.body);
	var inputfielddata2={
		mid : req.body.mid,
		msg : req.body.msg,
		sts : '0'
	}
	
	messagemodel.updateMessage(inputfielddata2, function(error, result){
		if (error) {
			var msg = "Wrong input";
			res.redirect("/update?"+msg);
		}
		else{
			res.redirect("/dashboard")
		}
	});
});

module.exports = router;
