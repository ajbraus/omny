var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    createdAt         : Date
  , updatedAt         : Date
  , publishedAt       : Date
  , title             : String
  , slug              : String
  , subtitle          : String
  , body              : String
  , authorName        : String
  , authorPicName     : String
  , backgroundUrl     : String
})

function slugify(text) {
   return text.toString().toLowerCase()
     .replace(/\s+/g, '-')        // Replace spaces with -
     .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
     .replace(/\-\-+/g, '-')      // Replace multiple - with single -
     .replace(/^-+/, '')          // Trim - from start of text
     .replace(/-+$/, '');         // Trim - from end of text
 }

PostSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});


// PRETTY URLS

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
  next(); 
});

var moment = require('moment'); 

PostSchema.virtual('url').get(function() {
  var date = moment(this.date)
    , formatted = date.format('YYYY[/]MM[/]');

  // formatted results in the format '2012/10/'

  return formatted + this.slug;
});

PostSchema.set('toObject', { getters: true });



var Post = mongoose.model('Post', PostSchema);

module.exports = Post;