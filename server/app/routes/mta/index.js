'use strict';

var router = require('express').Router();
    // mongoose = require('mongoose');
var path = require('path');
var express = require('express');
// var app = express();

var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

module.exports = router;

router.use('/register', require('./register.js'));

// getting info from MTA

router.get('/', function (req, res) {

    var serviceStatus = [];
    var serviceText = [];
    var service = [];
    var serviceName = [];
    var train = [];
    
    request('http://web.mta.info/status/serviceStatus.txt', function(error, response, body) {
        if(!error && response.statusCode == 200) {
            parser.parseString(body, function(err, result) {
        
                result.service.subway[0].line.forEach(function(elem){
                    serviceName.push(elem.name[0]);
                    serviceStatus.push(elem.status[0]);
                    serviceText.push(elem.text[0]);

                })
                service.push(serviceName);
                service.push(serviceStatus);
                service.push(serviceText);
                
            })
            res.send(service);

            // var train123 = {name: serviceName[0],
            //  status: serviceStatus[0],
            //  text: serviceText[0]}
            //  console.log(train123);
        }
    })
})