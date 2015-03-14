'use strict';
var router = require('express').Router();
var _ = require('lodash');
var passport = require('passport');
var request = require('request');
var xml2js = require('xml2js');
var sendSms = require('./sendSms.js');



var parser = new xml2js.Parser();

router.use('/register', require('./register'));
router.use('/sms', require('./sendSms.js'));


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
  }; // end of getmetadata;

  /**
   * [check previous status description]
   * @param  {[type]} previous [description]
   * @param  {[type]} new      [description]
   * @return {[either false, or if true, tell you which trains are different]}          [Boolean or array of train changes with new status]
   */
  function checkPrevTrains(previous, newtrains) {
    //for loop previous and new value statuses
    //
    //
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
        if (!status) {

        } else {
          //go implement socket.io logic to update view in the front end


          //check database to see which users use this line

          //get their numbers and use twilio to send message, ONLY IF not good service
        }
        trains.forEach(function(train) {
          console.log("name: ", train.name, ", status : ", train.status);
        })
      }
    })
  }, 5000)


  //

  // request('http://web.mta.info/status/serviceStatus.txt', function(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     parser.parseString(body, function(err, result) {
  //       // res.json(result);
  //       // res.json(result.service.subway[0].line);
  //       result.service.subway[0].line.forEach(function(elem) {
  //         serviceName.push(elem.name[0]);
  //         serviceStatus.push(elem.status[0]);
  //         serviceText.push(elem.text[0]);

  //       })
  //       service.push(serviceName);
  //       service.push(serviceStatus);
  //       service.push(serviceText);

  //     })

  //     for (var i = 0; i < 10; i++) {
  //       var trainObj = {
  //         name: serviceName[i],
  //         status: serviceStatus[i],
  //         text: serviceText[i]
  //       };
  //       trains.push(trainObj);
  //     }

  //   }
  //   res.json(trains);
  // })
})

router.use(function(req, res) {
  res.status(404).end();
});

module.exports = router;