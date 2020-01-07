import { join } from "path";
import express from "express";
import socketIO from "socket.io";

const PORT = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views")); // __dirname: C:\Users\지애리\Desktop\Nomadcoders\guess-mine\src
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
const io = socketIO(server); // localhost:3000/socket.io/socket.io.js  <- To make socketIO frontend와 socketIO backend communicate each other
