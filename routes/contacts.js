var Contact = require('../models/contact.js')

module.exports = function(app) {

  // NEW CONTACT
  app.get('/contact-us', function(req, res) {
    res.render('contact-us')
  })

  // CREATE
  app.post('/contacts', function (req, res) {
    Contact.create(req.body, function (err, contact) {
      if (err) { return res.status(400).send(err) }
      console.log(contact)
      // app.mailer.send('emails/new-contact', {
      //   to: "info@goldenchai.co",
      //   subject: 'GC Contact: ' + contact.first + " " + contact.last + " - " + contact.subject,
      //   contact: contact
      // }, function (err) {
      //   if (err) { console.log(err); return }
      // });

      res.send(contact)
    })
  });

}