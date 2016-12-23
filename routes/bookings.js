var Booking = require('../models/booking.js');

module.exports = function(app) {

  app.get('/bookings', function(req, res, next) {
    Booking.find(function (err, bookings) {
      res.render('bookings-index', { bookings: bookings })
    })

    //{ createdAt: { $gte: new Date() } }
  });

  app.get('/bookings/new', function(req, res, next) {
    res.render('bookings-new')
  });

  app.post('/bookings', function(req, res, next) {
    var booking = new Booking(req.body);

    booking.save(function (err) {
      if (err) { 
        console.log(err);
        return res.status(401).send(err);
      }

      res.send(booking);
    });
  });

} 