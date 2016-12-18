var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ReservationSchema = new Schema({
    createdAt                     : { type: Date }
  , updatedAt                     : { type: Date }

  , place                         : { type: String }
  , address                       : { type: String }
  , street_number                 : { type: String }
  , route                         : { type: String }
  , locality                      : { type: String }
  , administrative_area_level_1   : { type: String }
  , country                       : { type: String }
  , postal_code                   : { type: String }

  , startsAt                      : Date
  , endsAt                        : Date
  , seconds                       : Number

  , priceInCents                  : Number
  , feeInCents                    : Number
  , totalInCents                  : Number

  // , taxPerCent                    : Number
  // , taxInCents                    : Number
  // , lateChargesInCents            : Number

  // , finalTotalInCents             : Number

  , user          : { type: Schema.Types.ObjectId, ref: 'User', required: true }
  , host          : { type: Schema.Types.ObjectId, ref: 'Host' }
})

// SET createdAt and updatedAt
ReservationSchema.pre('save', function(next) {
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

var Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
