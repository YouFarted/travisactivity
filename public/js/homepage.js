$(document).ready(() => {
  const login = $("button#login");
  //   const signup = $("button#signup");
  //   const searchButton = $("submit#search-button");
  //   const searchField = $("input#search-field");

  login
    .click(() => {
      $.post("/api/login");
    })
    .then(() => {
      window.location.replace("/");
    })
    .catch(err);
});
