var Contact = require('../models/contact.js')

module.exports = function(app) {

  // HOME PAGE & NEW ORDERS
  app.get('/', function (req, res, next) {
    res.render('index', {});
  });

  // ABOUT PAGE
  app.get('/about-us', function (req, res) {
    res.render('about', {})
  });

  // ABOUT PAGE
  app.get('/how-it-works', function (req, res) {
    res.render('how-it-works', {})
  });

  // FAQ PAGE
  app.get('/faq', function (req, res) {
    res.render('faq', {})
  });

  app.get('/admin/dashboard', function (req, res) {
    Contact.find().exec(function (err, contacts) {
      res.render('admin/dashboard', { orders: orders, contacts: contacts });
    })
  })

  // LANDING PAGE
  app.get('/welcome', function (req, res) {
    res.render('landing', {})
  });
};