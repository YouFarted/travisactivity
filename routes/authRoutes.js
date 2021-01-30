// Requiring our models and passport as we've configured it
const db = require("../models");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const passport = require("../config/passport");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: "uploads", fileFilter: fileFilter });
const type = upload.single("myImage");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", (req, res) => {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    aboutMe: req.body.aboutMe,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    hobbies: req.body.hobbies,
    password: req.body.password
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      image: req.user.profileImagePath,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      aboutMe: req.user.aboutMe,
      age: req.user.age,
      gender: req.user.gender,
      hobbies: req.user.hobbies,
      whenJoined: req.user.createdAt,
      email: req.user.email,
      id: req.user.id
    });
  }
});

router.post("/api/profileImageUpload", type, (req, res) => {
  console.log("great!");
  if (!req.user) {
    res.json({});
  } else {
    const tmpPath = req.file.path;
    let ext = null;

    const mimeSplitWack = req.file.mimetype.split("/");

    if (mimeSplitWack.length === 2 && mimeSplitWack[0] === "image") {
      ext += "." + mimeSplitWack[1];
    }

    let basenameWithoutExtension = "";
    const splitBasename = path.basename(req.file.path).split(".");
    if (splitBasename.length === 1) {
      basenameWithoutExtension = splitBasename[0];
    } else if (splitBasename.length === 2) {
      basenameWithoutExtension = splitBasename[0];
    }

    const targetWebPath = "userimages/" + basenameWithoutExtension + ext;
    const targetFilePath = "public/" + targetWebPath;
    console.log("new web file at: " + targetWebPath);

    fs.rename(tmpPath, targetFilePath, err => {
      if (err) {
        res.end("error: " + err); //TODO
      } else {
        db.User.findOne({
          where: {
            email: req.user.email
          }
        }).then(dbUser => {
          dbUser.update({
            profileImagePath: targetWebPath
          });
          // this updates the loaded user in the session for when this is reused within the current session.
          req.user.profileImagePath = targetWebPath;
          res.redirect("/profile.html");
        });
      }
    });
  }
});

router.get("/api/dev/runSeeds", (req, res) => {
  if (!req.user || !req.user.isDeveloper) {
    // The user is not logged in, send back an empty object
    console.log(
      "User is either not logged in or is not a developer.  Reseeding is a developer feature."
    );
    res.status(404).json({});
  } else {
    // run the reseed.
    require("../lib/databaseSeed")()
      .then(result => res.json({ reseedingSuccuss: result }))
      .catch(e => res.json({ reseedingFail: e }));
    res.json({ reseeding: true });
  }
});

module.exports = router;
