var express = require('express');
var router = express.Router();

var Reservation = require('./reservation.js');

router.get('/', function(req, res, next) {
  res.render('reservations-index')
});

router.get('/new', function(req, res, next) {
  res.render('reservations-new')
});

module.exports = router;