// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();

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

module.exports = router;
