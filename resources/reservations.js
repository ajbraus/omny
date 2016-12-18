var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('reservations-index')
});

router.get('/new', function(req, res, next) {
  res.render('reservations-new')
});

module.exports = router;
