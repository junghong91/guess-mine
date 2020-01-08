import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views")); // __dirname: C:\Users\지애리\Desktop\Nomadcoders\guess-mine\src
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static"))); // front end 관련 파일을 static 에 넣는다.
app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`Server Running: http://localhost:${PORT}`);
  // console.log(__dirname); // C:\Users\지애리\Desktop\Nomadcoders\guess-mine\src
};

// app.listen(PORT, handleListening); // 기존의 방식

// express server 위에 다른 server를 올리기(Using SocketIO)
const server = app.listen(PORT, handleListening); // trafic 이 다르기 때문에, 같은 포트에서 작업한다.

// socketIO --> server 와 client 가 동시에 될 수 있다.
// 위에서 만든 server 를 socketIO에 전달하는 과정. ('io': name of server, listen all the event from the client)
const io = socketIO.listen(server); // localhost:3000/socket.io/socket.io.js  <- To make socketIO frontend와 socketIO backend communicate each other

// let sockets = [];

// connection 의 시작점(entry point)
io.on("connection", socket => {
  // sockets.push(socket.id);
  // setTimeout(() => socket.emit("hello"), 5000); // server 가 event를 emit 한다.
  // setTimeout(() => socket.broadcast.emit("hello"), 5000); // broadcast 현재 접속한 client가 제외된다.
  socket.on("newMessage", ({ message }) => {
    // console.log(message);
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anonymous"
    }); // message와 nickname 은 socket 객체에 들어있다.
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});

// setInterval(() => console.log(sockets), 1000); // socket이 어떻게 생겼는지...
