$(document).ready(() => {
  const reseedButton = $("#reseedButton");
  const logStatus = $("#logStatus");

  reseedButton.on("click", () => {
    $.ajax({
      type: "GET",
      url: "/api/dev/runSeeds",
      success: function(msg) {
        logStatus.append(`database was reseeded: ${JSON.stringify(msg)}`);
      },
      error: function(msg) {
        logStatus.append(`database reseeded attempt failed: ${msg}`);
      }
    });
  });
});
