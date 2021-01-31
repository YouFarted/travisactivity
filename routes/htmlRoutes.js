/* eslint-disable prettier/prettier */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  } else {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  }
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  } else {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  }
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page

  if (req.user) {
    res.redirect("/members");
  } else {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  }
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, (req, res) => {
  if (
    req.user.isDeveloper &&
    !req.session.hasAlreadyBeenRedirectedFromMembersToDevelopersOnce
  ) {
    req.session.hasAlreadyBeenRedirectedFromMembersToDevelopersOnce = true;
    res.redirect("/developers");
  } else {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  }
});

//-----
//Working code for profile route
router.get("/profiles/:username", isAuthenticated, (req, res) => {
  const sessionUser = req.user;
  if (!sessionUser) {
    res
      .status(404)
      .json({ error: "you need to be logged in to see any profiles." });
  } else {
    const usernameToLookAt = req.params.username;
    console.log(`The url wants a user named ${usernameToLookAt}`);
    db.User.findOne({
      where: {
        username: usernameToLookAt
      }
    }).then(dbProfileOfUserWeAreLookingAt => {
      console.log(
        "dbProfileOfUserWeAreLookingAt.username: " +
          dbProfileOfUserWeAreLookingAt.username
      );
      console.dir(dbProfileOfUserWeAreLookingAt);
      const profileData = dbProfileOfUserWeAreLookingAt.dataValues;
      profileData.layout = "main";
      profileData.areTheyLookingAtTheirOwnProfile =
        profileData.username === sessionUser.username;
      if (profileData.profileImagePath === null) {
        profileData.profileImagePath = "whoknows.webp";
      }
      res.render("index", profileData);
    });
  }
});

//-----
//Cloned code for messages route. Commenting this out for now as it's erroring. Once stable, I want to use handlbars
router.get("/my-messages/:username", isAuthenticated, (req, res) => {
  const sessionUser = req.user;
  if (!sessionUser) {
    res
      .status(404)
      .json({ error: "you need to be logged in to see any profiles." });
  } else {
    const messageUsername = req.params.username;
    console.log(`The url wants a user named ${messageUsername}`);
    db.Message.findAll({
      where: {
        sendingUserId: messageUsername
      }
    }).then(dbAllMyMessages => {
      //this one works
      console.log("dbAllMyMessages: ", dbAllMyMessages);
      //this comes back as undefined
      console.log(
        "dbAllMyMessages.sendingUserId: ",
        dbAllMyMessages.sendingUserId
      );
      //this one throws an error
      console.log(
        "dbAllMyMessages[0].sendingUserId: ",
        dbAllMyMessages[0].sendingUserId
      );
      console.dir(dbAllMyMessages);
      const messageData = dbAllMyMessages;
      messageData.layout = "main";
      res.render("messages1", messageData);
    });
  }
});

router.get("/messages", isAuthenticated, (req, res) => {
  if (req.user) {
    res.sendFile(path.join(__dirname, "../public/messages.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  }
});

router.get("/developers", isAuthenticated, (req, res) => {
  if (req.user.isDeveloper) {
    res.sendFile(path.join(__dirname, "../private/developer_admin.html"));
  } else {
    res.redirect("/members");
  }
});

router.get("/private/js/developer.js", isAuthenticated, (req, res) => {
  if (req.user && req.user.isDeveloper) {
    res.sendFile(path.join(__dirname, "../private/js/developer.js"));
  } else {
    res.status(404).end("nope - only devs get access to this");
  }
});
module.exports = router;
