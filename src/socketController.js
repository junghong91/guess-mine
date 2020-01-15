import events from "./event";

let sockets = []; // 접속하는 user 의 nickname 을 넣을 변수

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data); // socket.broadcast.emit(events.newUser, { nickname }); 이부분을 함수로...
  const superBroadcast = (event, data) => io.emit(event, data); // io.emit(event sent to all connected client)
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    // socket.broadcast.emit(events.newUser, { nickname }); // 첫번째 user 의 nickname 을 broadcasting
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id); // disconnect 한 socket(user)의 id와 다른 socket만 저장(diconnet한 socket 제거)
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

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
