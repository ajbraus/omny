var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var BookingSchema = new Schema({
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
  , hours                         : Number

  , priceInCents                  : Number
  , feeInCents                    : Number
  , totalInCents                  : Number

  // , taxPerCent                    : Number
  // , taxInCents                    : Number
  // , lateChargesInCents            : Number

  // , finalTotalInCents             : Number

  , user          : { type: Schema.Types.ObjectId, ref: 'User' }
  , host          : { type: Schema.Types.ObjectId, ref: 'Host' }
})

// SET createdAt and updatedAt
BookingSchema.pre('save', function(next) {
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

var Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
