var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// GETTER
function toLower (v) {
  return v.toLowerCase();
}

// EarlyAdopter SCHEMA
var EarlyAdopterSchema = new Schema({
    createdAt          : Date
  , updatedAt          : Date
  , email              : { type: String, required: true, unique: true, trim: true, set: toLower }
  , referralToken      : String

  , referrals          : [{ type: Schema.Types.ObjectId, ref: 'EarlyAdopter' }]
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
})

EarlyAdopterSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
});

var EarlyAdopter = mongoose.model('EarlyAdopter', EarlyAdopterSchema);

module.exports = EarlyAdopter;