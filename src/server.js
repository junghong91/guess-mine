import { join } from "path";
import express from "express";

const PORT = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`Server Running: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
