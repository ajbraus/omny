var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    createdAt     : { type: Date }
  , updatedAt     : { type: Date }
  , quantity      : String
  , address       : String
  , email         : String
  , phone         : String
  , zipcode       : String
  , status        : String
  , btNonce       : String
})

OrderSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;