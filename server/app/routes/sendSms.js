var accountSid = 'AC9500ed900b16752a91f1a5e7be08aa7e';
var authToken = 'f7ccf45537ca4c0e9a6f67e7c2eac50c';
var socketio = require('../../start.js').server;

var router = require('express').Router();

var io = require('../../io')(socketio);


module.exports = router;

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);



router.post('/', function(req, res) {

  client.messages.create({
    body: "Hi " + req.body.data.name + ". The " + req.body.train.name + " train totally sucks. Its current status is: " + req.body.train.status,
    to: req.body.data.phoneNumber,
    from: "+12316133529"
  }, function(err, message) {
    if (err) {
      console.error(err)
    } else {
      console.log("message", message);
      }
    });
})

// router.sendMessage = function(message) {
//   client.messages.create({
//     body: message,
//     to: "+13477498996",
//     from: "+12316133529"
//   }, function(err, message) {
//     if (err) {
//       console.error(err)
//     } else {
//       console.log("message", message);
//     }
//   });
// }
