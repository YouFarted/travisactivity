const messages = document.getElementById("messages");
const textbox = document.getElementById("textbox");
const button = document.getElementById("button");
const socket = io("http://localhost:3000");

button.addEventListener("click", () => {
  const newMessage = document.createElement("li");
  newMessage.innerHTML = textbox.value;
  messages.appendChild(newMessage);
  textbox.value = "";
});
