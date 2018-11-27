const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Create a new user
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(users) {
      res.json(users);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log(req.user);
    res.json(req.user);
  });

  app.post("/api/posts", function(req, res) {
    db.post.create(req.body).then(function(posts) {
      res.json(posts);
    })
  })

  app.post("/api/comments", function(req, res) {
    db.comments.create(req.body).then(function(comment) {
      res.json(comment);
    })
  })

  app.get("/api/posts", function(req, res) {
    db.post.findAll({}).then(function(posts) {
      res.json(posts);
    })
  })

  app.get("/api/comments", function(req, res) {
    db.comments.findAll({
      include: [db.user, db.post]
    }).then(function(comments) {
      res.json(comments);
    })
  })

  app.delete("/api/posts/:id", function(req, res) {
    db.post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(posts) {
      res.json(posts);
    })
  })

  app.get("/api/posts/:id", function(req, res) {
    db.post.findOne({
      include: [db.user],
      where: {
        id: req.params.id
      }
    }).then(function(posts) {
      res.json(posts);
    })
  })
};
