process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV == 'development') {
  require('dotenv').load();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mailer = require('express-mailer');
var mongoose  = require('mongoose');
var sm = require('sitemap');

var app = express();

var sitemap = sm.createSitemap ({
  hostname: 'http://www.beomny.com',
  cacheTime: 600000,        // 600 sec - cache purge period 
  urls: [
    { url: '/',  changefreq: 'monthly', priority: 1 },
    { url: '/blog', changefreq: 'weekly', priority: 1 },
    { url: '/about-us/',  changefreq: 'monthly', priority: 0.3 },
    { url: '/faq/',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/contact-us/'},
    { url: '/welcome/'}
  ]
});
 
app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});


// app.use(favicon(__dirname + '/public/images/favicons/favicon.ico'));

mongoose.connect(process.env.MONGODB_URI);

mailer.extend(app, {
  from: 'Omny Teleportation Services', 
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'beomnypresent@gmail.com',
    pass: process.env.EMAIL_SECRET
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/pages')(app);
require('./routes/contacts')(app);
require('./routes/adopters')(app);
require('./routes/bookings')(app);
require('./routes/posts')(app);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
