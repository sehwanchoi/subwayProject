'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.post('/', function(req, res, next) {
	
	var body = req.body;
    var email = req.body.email;
    var password = req.body.password;
    var phoneNumber = req.body.phoneNumber;
    var name = req.body.name;
    var commute = req.body.commute;
    var time = req.body.time;

	mongoose.model('User').findOne({email: email}, function(err, user){
		
		console.log("hello in Register Route")

		if(err) return next(err);

		if(user !== null){
			console.log("You already have an account")
			res.json(user)
		} else {
			mongoose.model('User').create({
				email: email,
				password: password,
				phoneNumber: phoneNumber,
				name: name,
				commute: commute,
				time: time
			}, function (err, user){
				// if (err) return next(err);
				res.json(user);
			});
		}
	})
});