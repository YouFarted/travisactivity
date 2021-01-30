"use strict";
$(document).ready(() => {
  const userNameTd = document.getElementById("user-name");
  const firstNameTd = document.getElementById("first-name");
  const lastNameTd = document.getElementById("last-name");
  const ageTd = document.getElementById("age");
  const genderTd = document.getElementById("gender");
  const aboutMeTd = document.getElementById("about-me");
  const hobbiesTd = document.getElementById("hobbies");
  // Getting references to our form and input
  console.log("the start of the page");

  // get elements on the html page and assign as variables
  //const loadBtn = document.getElementById("load-button");
  const imageImg = document.getElementById("image");

  function loadAjaxPageData() {
    console.log("inside the load");
    $.get("/api/user_data", user => {
      console.log(JSON.stringify(user));
      if (user.image === null) {
        imageImg.setAttribute("src", "/userimages/whoknows.webp");
      } else {
        imageImg.setAttribute("src", user.image);
      }
      userNameTd.innerHTML = user.username;
      ageTd.innerHTML = user.age;
      firstNameTd.innerHTML = user.firstName;
      lastNameTd.innerHTML = user.lastName;
      ageTd.innerHTML = user.age;
      genderTd.innerHTML = user.gender;
      aboutMeTd.innerHTML = user.aboutMe;
      hobbiesTd.innerHTML = user.hobbies;
    });
  }

  loadAjaxPageData();
});
