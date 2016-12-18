var express = require('express');
var router = express.Router();
var EarlyAdopter = require('./early-adopter.js');

router.get('/', function(req, res, next) {
  res.render('early-adopters-index')
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  // SET TOKEN
  var token = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 9; i++ ) {
    token += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  req.body.referralToken = token;

  earlyAdopter = new EarlyAdopter(req.body);

  // SAVE 
  earlyAdopter.save(function(err, earlyAdopter) {
    if (err) { return res.status(400).send(err) }

    console.log(earlyAdopter)
    res.send(earlyAdopter);
  });
});

module.exports = router;
