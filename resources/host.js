var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var HostSchema = new Schema({
    createdAt    : { type: Date }
  , updatedAt    : { type: Date }

  , name         : String
  , id           : Number
})

// SET createdAt and updatedAt
HostSchema.pre('save', function(next) {
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

var Host = mongoose.model('Host', HostSchema);

module.exports = Host;
