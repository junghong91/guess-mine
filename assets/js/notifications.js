const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) =>
  fireNotification(`${nickname} just joined!`, "rgb(0, 122, 255)");

// window.socket.on(window.events.newUser, handleNewUser); // handleNewUser를 export 해서 sockets.js 에서 다룰것.

export const handleDisconnected = ({ nickname }) =>
  fireNotification(`${nickname} just left!`, "rgb(255, 149, 0)");
