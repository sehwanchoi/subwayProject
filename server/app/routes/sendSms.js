var accountSid = 'ACba4bcb60ae5d4a645c47d75e7e7e0653';
var authToken = '14fe2e9f0557ae95f75a17b93a4993c4';

var router = require('express').Router();

// var socket = require('../../io')();

module.exports = router;

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);

router.post('/', function(req, res) {
  console.log("")

  // client.messages.create({
  //   body: "Hi " + req.body.data.name + ". The " + req.body.train.name + " train totally sucks. Its current status is: " + req.body.train.status,

  //   to: "19173741784",
  //   from: "+12012685286"
  // }, function(err, message) {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log("message", message);
  //     }
  //   });
})
