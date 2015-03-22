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
 

  function getMtaData(next) {
    var service = [];
    var serviceName = [];
    var serviceStatus = [];
    var serviceText = [];
    var previoustrains = [];
    var trains = [];
    // console.log("Getting inside ")
    request('http://web.mta.info/status/serviceStatus.txt', function(error, response, body) {
      if (error) {
        next(error);
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
  
  // compare prev with curr train 
  var checkPrevTrains = function (arr1, arr2 ){
    var msg = [];
    if(arr1 === "undefined"){
    arr1 = arr2;
    } else {
        for(var i = 0; i < arr1.length; i++){
            if(arr1[i].status === arr2[i].status){
            } else {
            var obj = {
                line: arr1[i].name,
                previous: arr1[i].status,
                current: arr2[i].status
                }
            msg.push(obj)
            }
        }
        arr1 = arr2;
    }
    return msg;
  }

var previousTrains;
  
  getMtaData(function(err, trains) {
    if (err) {
      console.error(err)
    } else {
      previousTrains = trains;
      console.log("previoustrains in getMtaData: ", previousTrains);
      res.json(trains)
    }
  });

  var statusClone;
  //setinterval that checks mta data on interval 

  var mtaDataInterval = setInterval(function() {
     // currentTrains = getFakeData();
    getMtaData(function(err, currentTrains) {
      if (err) {
        console.log(err)
      } else {
        console.log(">>>>>>>>>>>>>>>>>>>NEW REQUEST", Date.now());
        
        var status = checkPrevTrains(previousTrains, currentTrains);

        statusClone = status; 

        console.log("status: ", status);
        if (status.length < 1) {
          console.log("there is no change")  
          previousTrains = currentTrains;
        } else {
          for(var i = 0; i < status.length; i++){
            mongoose.model('User').find({commute: status[i].line}, function(err, users){
              for (var i = 0; i < users.length; i++){
                client.messages.create({
                  body: "Hi " + users[i].name + ". The " + users[i].commute + " train totally sucks. Its status changed from: " + statusClone[i].previous + " to " + statusClone[i].current + ". Plan Acoordingly. Maybe move?",
                  to: users[i].phoneNumber,
                  from: "+12012685286"
                }, function(err, message) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("message sent!");
                    }
                  });
                } // closing for loop 
            })  // end of mongoose 
          } // end of for loop 

          console.log("currentTrains: ", currentTrains);
          previousTrains = currentTrains;
        } //closing else 

        currentTrains.forEach(function(train) {
          console.log("name: ", train.name, ", status : ", train.status);
        })
      } // end of else 
    })
  }, 600000) // end of setInterval function    
})

router.use(function(req, res) {
  res.status(404).end();
});

module.exports = router;