const socket = io("/");

// socket.on("hello", () => console.log("Somebody join")); // hello 라는 이벤트가 server로 부터 발생하면, console.log()

// setTimeout(() => socket.emit("helloGuys"), 4000);

function sendMessage(message) {
  socket.emit("newMessage", { message }); // { message: message }
  console.log(`You: ${message}`);
}

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}

function handleMessageNotif(data) {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
}

socket.on("messageNotif", handleMessageNotif);
