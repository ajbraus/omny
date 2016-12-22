var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// GETTER
function toLower (v) {
  return v.toLowerCase();
}

var ContactSchema = new Schema({
    createdAt          : Date
  , updatedAt          : Date
  , email              : { type: String, required: true, unique: true, trim: true, set: toLower }
  , referralToken      : String

  , referrals          : [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
})

ContactSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

var Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;