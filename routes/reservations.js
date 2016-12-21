var Reservation = require('../models/reservation.js');

module.exports = function(app) {

  app.get('/reservations', function(req, res, next) {
    res.render('reservations-index')
  });

  app.get('/reservations/new', function(req, res, next) {
    res.render('reservations-new')
  });

  app.post('/reservations', function(req, res, next) {
    Reservation.create(req.body, function (err, reservation) {
      if (err) { return res.status(400).send(err) }
      
      console.log(reservation)

      res.send(reservation)
    })
  });

} 