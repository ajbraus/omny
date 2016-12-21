var Post = require('../models/post.js')
  
module.exports = function(app) {

  app.get('/admin/posts', function(req, res) {
    Post.find().sort({publishedAt: 1}).exec(function(err, posts) {
      res.render('dashboard', { posts: posts });
    });
  });

  // INDEX
  app.get('/blog', function(req, res) {
    Post.find({ publishedAt: { $ne: null } }).exec(function(err, posts) {
      res.render('posts-index', { posts: posts });
    });
  });

  // NEW
  app.get('/admin/posts/new', function(req, res) {
    res.render('posts-new');
  });

  // CREATE
  app.post('/posts', function(req, res) {
    Post.create(req.body, function(err, post) {
      if (err) {return res.status(400).message(err)};
      res.redirect('/admin/posts');
    });
  });

  // SHOW
  app.get('/blog/:slug', function(req,res) {
    Post.findOne({'slug' : req.params.slug}).exec(function(err, post) {
      if (err) { return res.status(404).send(err) };
      res.render('posts-show', { post: post }); 
    });
  });

  // EDIT
  app.get('/admin/posts/:slug/edit', function(req, res) {
    Post.findOne({'slug' : req.params.slug}).exec(function(err, post) {
      if (err) { return res.status(404).send(err) };

      res.render('posts-edit', { post: post }); 
    });
  });

  // UPDATE
  app.put('/posts/:id', function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) { return res.status(400).message(err) };

      res.send(post);
    });
  });

  app.delete('/posts/:id', function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err, post) { 
      if (err) {return res.status(400).message(err)};

      res.redirect('/admin/posts');
    });
  });

  // PUBLISH
  app.post('/posts/:id/publish', function(req, res) {
    Post.findByIdAndUpdate(req.params.id, { publishedAt: new Date() }, function(err, post) {
      if (err) { return res.status(400).message(err) };
      res.redirect('/blog/' + post.slug);
    });
  });

  // UNPUBLISH
  app.post('/posts/:id/unpublish', function(req, res) {
    Post.findByIdAndUpdate(req.params.id, { publishedAt: null }, function(err, post) {
      if (err) { return res.status(400).message(err) };
      res.redirect('/admin/posts');
    });
  });

};