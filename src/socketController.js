import events from "./event";

const socketController = socket => {
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname }); // 첫번째 user 의 nickname 을 broadcasting
  });
};

export default socketController;
