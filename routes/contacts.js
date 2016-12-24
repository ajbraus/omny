var Contact = require('../models/contact.js')

module.exports = function(app) {

  // NEW CONTACT
  app.get('/contacts', function(req, res) {
    res.render('contacts-index')
  })

  // CREATE
  app.post('/contacts', function (req, res) {

    // SET TOKEN
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 9; i++ ) {
      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    req.body.referralToken = token;

    Contact.create(req.body, function (err, contact) {
      if (err) { return res.status(400).send(err) }

      app.mailer.send('emails/new-contact', {
        to: "ajbraus@gmail.com",
        subject: 'New contact' + contact.name + " - " + contact.email,
        contact: contact
      }, function (err) {
        if (err) { console.log(err); return }
      });

      res.send(contact)
    });
    
  });

}