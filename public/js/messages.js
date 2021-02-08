$(document).ready(() => {
  console.log("the javascript is connecting");
  //get the username of the logged in user
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  //grab all of the usernames so we can render into the dropdown list
  $.get("/api/messages").then(data => {
    // $(".message-list").text(data.username);
    const mySelect = $("#username-input");
    data.forEach(element => {
      console.log(element.username);

      mySelect.append(
        $(
          "<option id=" +
            element.username +
            ">" +
            element.username +
            "</option> "
        )
      );
    });
  });

  const messageListEl = $(".message-list");

  //grab all of the messages so we can render into the page. Use handlebars later
  $.get("/api/myMessages").then(data => {
    data.forEach(element => {
      const newRow = $(
        "<tr><td>" +
          element.createdAt +
          "</td><td>" +
          element.sendingUserId +
          "</td><td>" +
          element.receivingUserId +
          "</td><td>" +
          element.subject +
          "</td><td>" +
          element.body +
          "</td></tr>"
      );
      messageListEl.append(newRow);
    });
  });

  // Getting references to our form and input
  const sendMsgForm = $("send-msg-form");

  //get elements on the html page and assign as variables
  const sendMsgBtn = document.getElementById("send-button");

  // When the send button is clicked, we validate the subject and body are not blank
  sendMsgForm.on("submit", event => {
    event.preventDefault();
  });

  sendMsgBtn.addEventListener("click", event => {
    //later, add validation to prevent click when 'please select' is selected
    const recievingUserSelect = $("#username-input");
    const currentSubject = $("#subject-input");
    const currentBody = $("#body-input");
    event.preventDefault();

    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.email);
    });

    $.get("/api/user_data", user => {
      const newMsgData = {
        subject: currentSubject.val(),
        body: currentBody.val(),
        subject: currentSubject.val(),
        body: currentBody.val(),
        sendingUserId: user.username,
        receivingUserId: recievingUserSelect.val()
      };

      if (!newMsgData.subject || !newMsgData.body) {
        return;
      }
      console.log("this is before calling sendmessage");
      // If we have an email a subject and body, run the sendMessage function
      sendMessage(
        newMsgData.subject,
        newMsgData.body,
        newMsgData.sendingUserId,
        newMsgData.receivingUserId
      );
    });
  });

  // Does a post to the sendMessage route. If successful, it reloads the page
  // Otherwise we log any errors
  function sendMessage(subject, body, sendingUserId, receivingUserId) {
    console.log("test: ", $("#username-input option:selected").text());
    console.log("this is after it enters send message");
    $.post("/api/messages", {
      subject: subject,
      body: body,
      sendingUserId: sendingUserId,
      receivingUserId: receivingUserId
    })
      .then(() => {
        //clears out the values
        window.location.reload();
      })
      .catch(handleMessageError);
  }

  function handleMessageError(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

// prettier complains that socket is unused.
// Uncomment this when whoever wants to use it or delete this comment and the following line
// when it is noticed as an acknowedgement that socket won't be used in this file
// const socket = io("http://localhost:3000"); << travis barfs on this line
