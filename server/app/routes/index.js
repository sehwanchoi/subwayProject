'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/register', require('./register'));
router.use('/mta', require('./mta'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});