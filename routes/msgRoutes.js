// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");
const user = require("../models/user");
const { Op } = require("sequelize");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
// router.post("/api/login", passport.authenticate("local"), (req, res) => {
//   // Sending back a password, even a hashed password, isn't a good idea
//   res.json({
//     email: req.user.email,
//     id: req.user.id
//   });
// });

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/messages", (req, res) => {
  console.log("anything");
  db.Message.create({
    subject: req.body.subject,
    body: req.body.body,
    sendingUser_id: req.body.sendingUser_id,
    receivingUser_id: req.body.receivingUser_id
  })
    .then(dbMessage => {
      console.log(dbMessage);
      res.json(dbMessage);
      //   res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.get("/api/messages", (req, res) => {
  console.log("all the users!");
  db.User.findAll({
    attributes: ["username"]
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.get("/api/myMessages", (req, res) => {
  console.log("all the messages!");
  //   console.log(req.params);
  //   console.log(User);
  db.Message.findAll({
    attributes: ["sendingUser_id", "receivingUser_id", "subject", "body"],
    where: {
      [Op.or]: [
        { sendingUser_id: "yetanotherguy" },
        { receivingUser_id: "yetanotherguy" }
      ]
    }
    //WHERE username = req.params.username
  }).then(dbMessages => {
    res.json(dbMessages);
  });
});

//respond res.json with array object.

module.exports = router;
