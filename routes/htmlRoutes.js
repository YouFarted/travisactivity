/* eslint-disable prettier/prettier */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require("express").Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/homepage.html"));
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
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
  if(req.user.isDeveloper && !req.session.hasAlreadyBeenRedirectedFromMembersToDevelopersOnce) {
    req.session.hasAlreadyBeenRedirectedFromMembersToDevelopersOnce = true;  
    res.redirect("/developers"); 
  }
  else {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  }
});

router.get("/developers", isAuthenticated, (req, res) => {
  if(req.user.isDeveloper) {
    res.sendFile(path.join(__dirname, "../private/developer_admin.html"));
  } else {
    res.redirect("/members");
  }
});

router.get("/private/js/developer.js", isAuthenticated, (req, res) => {
  if(req.user && req.user.isDeveloper) {
    res.sendFile(path.join(__dirname, "../private/js/developer.js"));
  } else {
    res.status(404).end("nope - only devs get access to this");
  }
});
module.exports = router;