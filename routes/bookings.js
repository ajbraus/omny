var Booking = require('../models/booking.js');

module.exports = function(app) {

  app.get('/bookings', function(req, res, next) {
    Booking.find({ createdAt: { $gte: new Date() } }, function(err, bookings) {
      res.render('bookings-index', { bookings: bookings })
    })
  });

  app.get('/bookings/new', function(req, res, next) {
    res.render('bookings-new')
  });

  app.post('/bookings', function(req, res, next) {
    console.log(req.body);



    Booking.create(req.body, function (err) {
      if (err) { return res.status(401).send(err) }

      res.send(booking)
    })
  });

} 