var Adopter = require('../models/adopter.js')

module.exports = function(app) {

  // NEW CONTACT
  app.get('/adopters', function(req, res) {
    res.render('adopters-index')
  })

  // CREATE
  app.post('/adopters', function (req, res) {

    // SET TOKEN
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 9; i++ ) {
      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    req.body.referralToken = token;

    Adopter.create(req.body, function (err, adopter) {
      if (err) { return res.status(400).send(err) }
      console.log(adopter)
      // app.mailer.send('emails/new-adopter', {
      //   to: "info@goldenchai.co",
      //   subject: 'GC Adopter: ' + adopter.first + " " + adopter.last + " - " + adopter.subject,
      //   adopter: adopter
      // }, function (err) {
      //   if (err) { console.log(err); return }
      // });

      res.send(adopter)
    });
    
  });

}