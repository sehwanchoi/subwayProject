var accountSid = 'AC9500ed900b16752a91f1a5e7be08aa7e'; 
var authToken = 'f7ccf45537ca4c0e9a6f67e7c2eac50c'; 
 
var router = require('express').Router();
 module.exports = router;
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

router.post('/', function(req, res) {
	
	client.messages.create({
	    body: "Jenny please?! I love you <3",
	    to: "+13477498996",
	    from: "+12316133529"
	}, function(err, message) {
	    console.log('message', message);
	});
	
})
 