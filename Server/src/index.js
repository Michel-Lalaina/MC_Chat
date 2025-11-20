const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

app.get("/", (req, res) => {
  res.send("Backend Node.js opérationnel !");
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
