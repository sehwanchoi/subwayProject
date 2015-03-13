'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/register', function(req, res, next) {
    console.log("hello");
});
