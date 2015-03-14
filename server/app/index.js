'use strict';
var path = require('path');
var express = require('express');
var app = express();

var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


module.exports = app;

require('./configure')(app);

app.use('/api', require('./routes'));
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});


// Error catching endware.
app.use(function (err, req, res, next) {
    res.status(err.status).send(err.message);
});
