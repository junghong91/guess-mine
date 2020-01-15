import events from "./event";
import { chooseWord } from "./words";

const TIME_LIMIT = 120000;

let sockets = []; // 접속하는 user 의 nickname 을 넣을 변수
let inProgress = false;
let word = null;
let leader = null;
let timeout = null; // setTimeout 의 id 값을 저장 변수

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)]; // 0 ~ socket.length 사이의 random int

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data); // socket.broadcast.emit(events.newUser, { nickname }); 이부분을 함수로...

  const superBroadcast = (event, data) => io.emit(event, data); // io.emit(event sent to all connected client)

  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });

  const startGame = () => {
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        leader = chooseLeader();
        console.log(leader.nickname);
        word = chooseWord(); // choose word
        superBroadcast(events.gameStarting);
        setTimeout(() => {
          superBroadcast(events.gameStarted);
          io.to(leader.id).emit(events.leaderNotif, { word }); // io.to 는 특정(id값) 전송, emit event with word painter have to paint
          timeout = setTimeout(endGame, TIME_LIMIT); // 특정 시간 내에 못끝내면 endGame()
        }, 6000);
      }
    }
  };

  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
    setTimeout(() => startGame(), 2000);
    if (timeout !== null) {
      clearTimeout(timeout); // 누군가 이기면 timeout 종료
    }
  };

  const addPoints = id => {
    sockets = sockets.map(socket => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    endGame();
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    // socket.broadcast.emit(events.newUser, { nickname }); // 첫번째 user 의 nickname 을 broadcasting
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id); // disconnect 한 socket(user)의 id와 다른 socket만 저장(diconnet한 socket 제거)
    if (sockets.length === 1) {
      // leader가 나가면 game end
      // End Game  (inProgress = false)
      endGame();
    } else if (leader) {
      if (leader.id === socket.id) {
        endGame();
      }
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    broadcast(events.newMsg, { message, nickname: socket.nickname });
    if (message === word) {
      superBroadcast(events.newMsg, {
        nickname: "Admin",
        message: `Winner is ${socket.nickname}, Answer: ${word}`
      });
      addPoints(socket.id);
    }
  });

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
