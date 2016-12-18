var express = require('express');
var router = express.Router();

var Adopter = require('./adopter.js');

router.get('/', function(req, res, next) {
  res.render('adopters-index')
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

  adopter = new Adopter(req.body);

  // SAVE 
  adopter.save(function(err, adopter) {
    if (err) { return res.status(400).send(err) }

    console.log(adopter)
    res.send(adopter);
  });
});

module.exports = router;