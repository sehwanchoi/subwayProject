'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var passport = require('passport');
var request = require('request');
var xml2js = require('xml2js');
var sendSms = require('./sendSms.js');

// var socket = require('../../io')();

var parser = new xml2js.Parser();

router.use('/register', require('./register'));
router.use('/sms', require('./sendSms.js'));


var accountSid = 'ACba4bcb60ae5d4a645c47d75e7e7e0653';
var authToken = '14fe2e9f0557ae95f75a17b93a4993c4';
var client = require('twilio')(accountSid, authToken);

router.get('/mta', function(req, res) {

  var service = [];
  var serviceName = [];
  var serviceStatus = [];
  var serviceText = [];

  var previoustrains = [];

  function getMtaData(next) {
    var trains = [];
    // console.log("Getting inside ")
    request('http://web.mta.info/status/serviceStatus.txt', function(error, response, body) {
      if (error) {
        next(err);
      } else if (response.statusCode != 200) {
        next("response code not 200 " + response.statusCode)
      } else {
        parser.parseString(body, function(err, result) {
          // res.json(result);
          // res.json(result.service.subway[0].line);
          result.service.subway[0].line.forEach(function(elem) {
            serviceName.push(elem.name[0]);
            serviceStatus.push(elem.status[0]);
            serviceText.push(elem.text[0]);

          })
          service.push(serviceName);
          service.push(serviceStatus);
          service.push(serviceText);

        })

        for (var i = 0; i < 10; i++) {
          var trainObj = {
            name: serviceName[i],
            status: serviceStatus[i],
            text: serviceText[i]
          };
          trains.push(trainObj);
        }
        next(null, trains);
      }
    })
  }; // end of getMtaData;

  /**
   * [check previous status description]
   * @param  {[type]} previous [description]
   * @param  {[type]} new      [description]
   * @return {[either false, or if true, tell you which trains are different]}          [Boolean or array of train changes with new status]
   */
 
  var checkPrevTrains = function (arr1, arr2 ){
    var msg = [];
    if(arr1 === null){
    arr1 == arr2
    
    } else {
        for(var i = 0; i < arr1.length; i++){
            if(arr1[i].status === arr2[i].status){
            console.log("nothing");
            } else {
            var obj = {
                line: arr1[i].nema,
                previous: arr1[i].status,
                current: arr2[i].status
                }
            msg.push(obj)
            }
        }
    }
    return msg;
  }

  getMtaData(function(err, trains) {
    if (err) {
      console.error(err)
    } else {
      var previoustrains = trains;
      res.json(trains)
    }
  });


  //setinterval that checks mta data every 5 seconds
  var mtaDataInterval = setInterval(function() {
    getMtaData(function(err, trains) {
      if (err) {
        console.err(err)
      } else {
        console.log(">>>>>>>>>>>>>>>>>>>NEW REQUEST", Date.now());

        // check if you have previous trains, if you do, check if each of the status are the same

        var status = checkPrevTrains(previoustrains, trains);
        
        // var status =
        //     [{line: '123', previous: 'good service', current: 'delayed' },
        //      {line: '7', previous: 'good service', current: 'planned work'}];

        var statusMap = status;


        if (status.length < 1) {
          console.log("there is no change")  
          console.log("status: ", status)
        } else {
          //go implement socket.io logic to update view in the front end

          //check database to see which users use this line

          //get their numbers and use twilio to send message, ONLY IF not good service

          for(var i = 0; i < status.length; i++){
            mongoose.model('User').find({commute: status[i].line}, function(err, users){

              console.log("hey just before sending text")
              console.log("users: ",users)
              console.log("status: ", status);

              for (var i = 0; i < users.length; i++){
                client.messages.create({
                  body: "Hi " + users[i].name + ". The " + users[i].commute + " train totally sucks. Its current status is: " + statusMap[i].current,

                  to: users[i].phoneNumber,
                  from: "+12012685286"
                }, function(err, message) {
                  if (err) {
                    console.error(err)
                  } else {
                    console.log("message", message);
                    }
                  });
                } // closing for loop 
            })  // end of mongoose 
          }
        } //closing else 

        trains.forEach(function(train) {
          console.log("name: ", train.name, ", status : ", train.status);
        })
      }
    })
  }, 60000)
})

router.use(function(req, res) {
  res.status(404).end();
});

module.exports = router;