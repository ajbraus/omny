var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
    createdAt     : { type: Date }
  , updatedAt     : { type: Date }
  , name          : String
  , email         : String
  , phone         : String
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