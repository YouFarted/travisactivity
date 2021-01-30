//use handlebars - most of this should be occurring in the routes
//this ties in the end of weeks 13 and 14

$(document).ready(() => {
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

  //grab all of the messages so we can render into the page using HANDLEBARS
  $.get("/api/myMessages").then(data => {
    $(".message-list").text(data);
    // const mySelect = $("#username-input");
    data.forEach(element => {
      console.log(element);

      // mySelect.append(
      //   $(
      //     "<option id=" +
      //       element.username +
      //       ">" +
      //       element.username +
      //       "</option> "
      //   )
      // );
    });
  });

  // Getting references to our form and input
  console.log("the start of the page");
  const sendMsgForm = $("send-msg-form");

  //get elements on the html page and assign as variables
  const messageList = document.getElementById("messages");
  const subjectInput = document.getElementById("subject-input");
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
        sendingUser_id: user.username,
        receivingUser_id: recievingUserSelect.val()
      };

      if (!newMsgData.subject || !newMsgData.body) {
        return;
      }
      console.log("this is before calling sendmessage");
      // If we have an email a subject and body, run the sendMessage function
      sendMessage(
        newMsgData.subject,
        newMsgData.body,
        newMsgData.sendingUser_id,
        newMsgData.receivingUser_id
      );
    });
  });

  // Does a post to the sendMessage route. If successful, it reloads the page
  // Otherwise we log any errors
  function sendMessage(subject, body, sendingUser_id, receivingUser_id) {
    console.log("test: ", $("#username-input option:selected").text());
    console.log("this is after it enters send message");
    $.post("/api/messages", {
      subject: subject,
      body: body,
      sendingUser_id: sendingUser_id,
      receivingUser_id: receivingUser_id
    })
      .then(() => {
        //clears out the values
        window.location.reload();
      })
      .catch(handleMessageError);
  }

  //query the database for messages where I'm the sending or receiving user and add below
  //for each loop
  //SELECT receivinguser.id, sendingUser.Id, messageBody FROM Messages WHERE Id ? :myId

  //placeholder where I'll create a line item later
  // const newMessage = document.createElement("li");
  // messageList.append(newMessage);
  //end loop

  function handleMessageError(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

// prettier complains that socket is unused.
// Uncomment this when whoever wants to use it or delete this comment and the following line
// when it is noticed as an acknowedgement that socket won't be used in this file
// const socket = io("http://localhost:3000"); << travis barfs on this line
