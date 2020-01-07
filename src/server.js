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

app.listen(PORT, handleListening);
