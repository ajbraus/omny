var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// GETTER
function toLower (v) {
  return v.toLowerCase();
}

// Adopter SCHEMA
var AdopterSchema = new Schema({
    createdAt          : Date
  , updatedAt          : Date
  , email              : { type: String, required: true, unique: true, trim: true, set: toLower }
  , referralToken      : String

  , referrals          : [{ type: Schema.Types.ObjectId, ref: 'Adopter' }]
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
})

AdopterSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
});

var Adopter = mongoose.model('Adopter', AdopterSchema);

module.exports = Adopter;