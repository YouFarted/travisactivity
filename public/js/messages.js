$(document).ready(() => {
  // Getting references to our form and input
  console.log("the start of the page");
  const sendMsgForm = $("send-msg-form");

  //get elements on the html page and assign as variables
  const messageList = document.getElementById("messages");
  const subjectInput = document.getElementById("subject-input");
  const bodyInput = document.getElementById("body-input");
  const sendMsgBtn = document.getElementById("send-button");
  const currentSubject = "asdf";
  const currentBody = "asdf1";

  // When the send button is clicked, we validate the subject and body are not blank
  sendMsgForm.on("submit", event => {
    event.preventDefault();
  });

  sendMsgBtn.addEventListener("click", event => {
    console.log("inside the on submit");
    event.preventDefault();
    $.get("/api/user_data", user => {
      console.log(JSON.stringify(user));
      const newMsgData = {
        // subject: currentSubject.val(),
        // body: currentBody.val(),
        subject: currentSubject,
        body: currentBody,
        sendingUser_id: user.username,
        receivingUser_id: "SomeGal1"
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

    // subjectInput.val("");
    // bodyInput.val("");
  });

  // Does a post to the sendMessage route. If successful, it reloads the page
  // Otherwise we log any errors
  function sendMessage(subject, body, sendingUser_id, receivingUser_id) {
    console.log("this is after it enters send message");
    $.post("/api/messages", {
      subject: subject,
      body: body,
      sendingUser_id: sendingUser_id,
      receivingUser_id: receivingUser_id
    })
      .then(() => {
        //I believe this'll work?
        // window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
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
