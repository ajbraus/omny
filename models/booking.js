var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var BookingSchema = new Schema({
    createdAt                     : { type: Date }
  , updatedAt                     : { type: Date }

  , name                          : { type: String }
  , email                         : { type: String }
  , phone                         : { type: String }

  , place                         : { type: String }
  , address                       : { type: String }
  , lat                           : { type: Number }
  , lng                           : { type: Number }

  , startsAt                      : Date
  , endsAt                        : Date
  , hours                         : Number

  , rentalFeeInCents              : Number
  , deliveryFeeInCents            : Number
  , totalFeeInCents               : Number

  , instructions                  : String
  , referralCode                  : String

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
