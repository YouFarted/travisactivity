// Requiring necessary npm packages
require("dotenv").config();
const express = require("express");
const session = require("express-session");

const handlebars = require("express-handlebars");

/*
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
*/

let doOnlySeeding = false;

const args = process.argv.slice(2);

if (args.length === 1 && args[0] === "seed") {
  console.log("seeding the database");
  doOnlySeeding = true;
}

if (doOnlySeeding) {
  require("./lib/databaseSeed")().catch(e => console.error(e));
} else {
  // Requiring passport as we've configured it
  const passport = require("./config/passport");

  // Setting up port and requiring models for syncing
  const PORT = process.env.PORT || 8080;
  const db = require("./models");

  // Creating express app and configuring middleware needed for authentication

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  // We need to use sessions to keep track of our user's login status
  app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //app.engine("handlebars", handlebars.engine);
  /*  app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    }));*/

  const authRoutes = require("./routes/authRoutes");
  const htmlRoutes = require("./routes/htmlRoutes");
  const msgRoutes = require("./routes/msgRoutes");

  app.engine("handlebars", handlebars({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");

  app.use(authRoutes, htmlRoutes, msgRoutes);

  // Syncing our database and logging a message to the user upon success
  db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });
}
