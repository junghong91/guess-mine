const notifications = document.getElementById("jsNotifications");

export const handleNewUser = ({ nickname }) => {
  console.log(nickname, " just joined");
};

// window.socket.on(window.events.newUser, handleNewUser); // handleNewUser를 export 해서 sockets.js 에서 다룰것.
