$(document).ready(() => {
  const login = $("button#login");
  const signup = $("button#signup");
  //   const searchButton = $("submit#search-button");
  //   const searchField = $("input#search-field");

  // When login button is clicked USER is redirected to login page
  login.click(event => {
    event.preventDefault();
    window.location.href = "/login";
  });

  // When signup button is clicked USER is redirected to signup page
  signup.click(event => {
    event.preventDefault();
    window.location.href = "/signup";
  });
});
