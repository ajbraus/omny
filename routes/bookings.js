var Booking = require('../models/booking.js');

module.exports = function(app) {

  app.get('/bookings', function(req, res, next) {
    res.render('bookings-index')
  });

  app.get('/bookings/new', function(req, res, next) {
    res.render('bookings-new')
  });

  app.post('/bookings', function(req, res, next) {
    Booking.create(req.body, function (err, booking) {
      if (err) { return res.status(400).send(err) }
      
      console.log(booking)

      res.send(booking)
    })
  });

} 