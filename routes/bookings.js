var Booking = require('../models/booking.js');
var _ = require('lodash')

module.exports = function(app) {

  app.get('/bookings', function(req, res, next) {
    Booking.find().sort('-startsAt').exec(function (err, bookings) {
      var futureBookings = _.filter(bookings, function(b) { return b.startsAt > new Date(); });
      var pastBookings = _.filter(bookings, function(b) { return b.endsAt < new Date(); });
      var currentBookings = _.filter(bookings, function(b) { return b.startsAt < new Date() && b.endsAt > new Date(); });

      res.render('bookings-index', { futureBookings: futureBookings, pastBookings: pastBookings, currentBookings })
    })
    //
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

      app.mailer.send('emails/booking-confirm', {
        to: booking.email,
        subject: 'Omny Booking Confirmed!',
        booking: booking
      }, function (err) {
        if (err) { console.log(err); return }
      });

      app.mailer.send('emails/booking-new', {
        to: "ajbraus@gmail.com",
        subject: 'New booking ' + booking.name + " - " + booking.phone,
        booking: booking
      }, function (err) {
        if (err) { console.log(err); return }
      });

      res.send(booking);
    });
  });

} 