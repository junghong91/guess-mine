import events from "./event";

const socketController = socket => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data); // socket.broadcast.emit(events.newUser, { nickname }); 이부분을 함수로...

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    // socket.broadcast.emit(events.newUser, { nickname }); // 첫번째 user 의 nickname 을 broadcasting
    broadcast(events.newUser, { nickname });
  });

  socket.on(events.disconnect, () =>
    broadcast(events.disconnected, { nickname: socket.nickname })
  );

  socket.on(events.sendMsg, ({ message }) =>
    broadcast(events.newMsg, { message, nickname: socket.nickname })
  );

  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );

  socket.on(events.strokePath, ({ x, y, color }) =>
    // 전송받은 좌표와 color를 broadcasting
    broadcast(events.strokedPath, { x, y, color })
  );

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
