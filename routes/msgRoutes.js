// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");
const user = require("../models/user");
const { Op } = require("sequelize");

router.post("/api/messages", (req, res) => {
  console.log("anything");
  db.Message.create({
    subject: req.body.subject,
    body: req.body.body,
    sendingUserId: req.body.sendingUserId,
    receivingUserId: req.body.receivingUserId
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
