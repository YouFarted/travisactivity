// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();
const { Op } = require("sequelize");

router.post("/api/messages", (req, res) => {
  db.Message.create({
    subject: req.body.subject,
    body: req.body.body,
    sendingUserId: req.body.sendingUserId,
    receivingUserId: req.body.receivingUserId
  })
    .then(dbMessage => {
      res.json(dbMessage);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.get("/api/messages", (req, res) => {
  db.User.findAll({
    attributes: ["username"]
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.get("/api/myMessages", (req, res) => {
  db.Message.findAll({
    attributes: [
      "createdAt",
      "sendingUserId",
      "receivingUserId",
      "subject",
      "body"
    ],
    where: {
      [Op.or]: [
        { sendingUserId: "yetanotherguy" },
        { receivingUserId: "yetanotherguy" }
      ]
    }
    //WHERE username = req.params.username
  }).then(dbMessages => {
    res.json(dbMessages);
  });
});

//respond res.json with array object.

module.exports = router;
