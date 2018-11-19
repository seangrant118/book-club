// import dependencies

const express = require("express");
const app = express();
// const routes = require("./routes");

// Port

const PORT = process.env.PORT || 3001;

// Define Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
