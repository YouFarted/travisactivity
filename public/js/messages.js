const messages = document.getElementById("messages");
const textbox = document.getElementById("textbox");
const button = document.getElementById("button");
// prettier complains that socket is unused.
// Uncomment this when whoever wants to use it or delete this comment and the following line
// when it is noticed as an acknowedgement that socket won't be used in this file
// const socket = io("http://localhost:3000"); << travis barfs on this line

button.addEventListener("click", () => {
  const newMessage = document.createElement("li");
  newMessage.innerHTML = textbox.value;
  messages.appendChild(newMessage);
  textbox.value = "";
});
