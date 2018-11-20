const db = require("../models");

module.exports = function(app) {
  // Create a new user
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(users) {
      res.json(users);
    });
  });
};
