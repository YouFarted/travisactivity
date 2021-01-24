$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const usernameInput = $("input#username-input");
  const emailInput = $("input#email-input");
  const aboutMeInput = $("input#about-me-input");
  const firstNameInput = $("input#first-name-input");
  const lastNameInput = $("input#last-name-input");
  const ageInput = $("input#age-input");
  const genderInput = $("input#gender-input");
  const hobbiesInput = $("input#hobbies-input");
  const passwordInput = $("input#password-input");

  console.log(
    usernameInput,
    emailInput,
    aboutMeInput,
    firstNameInput,
    lastNameInput,
    ageInput,
    genderInput,
    hobbiesInput,
    passwordInput
  );

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      aboutMe: aboutMeInput.val(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      age: ageInput.val().trim(),
      gender: genderInput.val().trim(),
      hobbies: hobbiesInput.val(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.username,
      userData.email,
      userData.aboutMe,
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.gender,
      userData.hobbies,
      userData.password
    );
    usernameInput.val("");
    emailInput.val("");
    usernameInput.val("");
    emailInput.val("");
    aboutMeInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    ageInput.val("");
    genderInput.val("");
    hobbiesInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(
    username,
    email,
    aboutMe,
    firstName,
    lastName,
    age,
    gender,
    hobbies,
    password
  ) {
    $.post("/api/signup", {
      username: username,
      email: email,
      aboutMe: aboutMe,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      hobbies: hobbies,
      password: password,
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
