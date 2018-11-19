// import dependencies
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const passport = require("passport");
// const routes = require("./routes");

// Port
const PORT = process.env.PORT || 3001;

// Define Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
// app.use(
//   session({
//     secret: "VOm4GldakkQ2ZBUwchMMdVCK1ncJr",
//     resave: false,
//     saveUninitialized: false,
//   })
// )
// app.use(passport.initialize());
// app.use(passport.session());

// Serve static assets to heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add Routes
// app.use(routes);

// connect to MySQL
const models = require("./models");

models.sequelize
  .sync({ Force: true })
  .then(function() {
    console.log("Database Connected");

    app.listen(PORT, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
      }
    });
  })
  .catch(function(err) {
    console.log(err, "Error on Database Sync. Please try again!");
  });
