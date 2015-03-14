'use strict';
var router = require('express').Router();
var _ = require('lodash');
var passport = require('passport');
var request = require('request');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

router.use('/register', require('./register'));
router.use('/textmsg', require('./textmsg'));

router.get('/mta', function (req, res) {

	var service = [];
	var serviceName = [];
	var serviceStatus = [];
	var serviceText = [];

	var trains = [];

	request('http://web.mta.info/status/serviceStatus.txt', function(error, response, body) {
		if(!error && response.statusCode == 200) {
			parser.parseString(body, function(err, result) {
				// res.json(result);
				// res.json(result.service.subway[0].line);
				result.service.subway[0].line.forEach(function(elem){
					serviceName.push(elem.name[0]);
					serviceStatus.push(elem.status[0]);
					serviceText.push(elem.text[0]);

				})
				service.push(serviceName);
				service.push(serviceStatus);
				service.push(serviceText);
			})

			for (var i=0; i < 10; i++) {
				var trainObj = {
					name: serviceName[i],
					status: serviceStatus[i],
					text: serviceText[i]
				};
				trains.push(trainObj);
			}
		}
			res.json(trains);
	})
})


router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
