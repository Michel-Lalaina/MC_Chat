require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const USE_DB = process.env.USE_DB === "true";
let MessageModel = null;
let UserModel = null;

if (USE_DB) {
  const mongoose = require("mongoose");
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error("MongoDB erreur:", err));

  const messageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    user: String,
    text: String,
    time: String,
    room: { type: String, default: "global" }
  }, { timestamps: true });

  const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: String,
    socketId: String,
    room: { type: String, default: "global" }
  });

  MessageModel = mongoose.model("Message", messageSchema);
  UserModel = mongoose.model("User", userSchema);
}

// --- stockage en mémoire si USE_DB=false ---
const inMemory = {
  messages: [], // { id, user, text, time, room }
  users: {}     // socketId -> { id, username, socketId, room }
};

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*"
  }
});

// Routes HTTP utiles
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/messages", async (req, res) => {
  const room = req.query.room || "global";
  if (USE_DB) {
    const msgs = await MessageModel.find({ room }).sort({ createdAt: 1 }).limit(500);
    return res.json(msgs);
  } else {
    const msgs = inMemory.messages.filter(m => m.room === room);
    return res.json(msgs);
  }
});
app.get("/users", async (req, res) => {
  if (USE_DB) {
    const users = await UserModel.find();
    return res.json(users);
  } else {
    return res.json(Object.values(inMemory.users));
  }
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("connect:", socket.id);

  // on attend que le client envoie 'join' avec { username, room? }
  socket.on("join", async ({ username, room = "global" }) => {
    const user = { id: uuidv4(), username, socketId: socket.id, room };

    // save user (db or memory)
    if (USE_DB) {
      await UserModel.findOneAndUpdate(
        { socketId: socket.id },
        user,
        { upsert: true, new: true }
      );
    } else {
      inMemory.users[socket.id] = user;
    }

    socket.join(room);

    // envoie la liste mise à jour à tous dans la room
    const usersInRoom = USE_DB
      ? (await UserModel.find({ room }).select('-__v -_id'))
      : Object.values(inMemory.users).filter(u => u.room === room);

    io.in(room).emit("users_update", usersInRoom);

    // envoyer l'historique de messages pour cette room au nouvel utilisateur
    const history = USE_DB
      ? await MessageModel.find({ room }).sort({ createdAt: 1 }).limit(500)
      : inMemory.messages.filter(m => m.room === room);
    socket.emit("history", history);

    console.log(`${username} a rejoint ${room}`);
  });

  // envoi d'un message : data doit contenir { user, text, room? }
  socket.on("send_message", async (data) => {
    const room = data.room || "global";
    const msg = {
      id: uuidv4(),
      user: data.user,
      text: data.text,
      time: data.time || new Date().toLocaleTimeString(),
      room
    };

    // persister
    if (USE_DB) {
      try {
        await MessageModel.create(msg);
      } catch (err) {
        console.error("Erreur sauvegarde message:", err);
      }
    } else {
      inMemory.messages.push(msg);
      // limiter la mémoire si nécessaire (ex : 1000 messages)
      if (inMemory.messages.length > 2000) inMemory.messages.shift();
    }

    // broadcast dans la room
    io.in(room).emit("receive_message", msg);
  });

  // typing indicator
  socket.on("typing", ({ user, room = "global" }) => {
    socket.to(room).emit("typing", { user });
  });

  // leave / disconnect
  const removeAndBroadcast = async () => {
    let leftUser = null;
    if (USE_DB) {
      leftUser = await UserModel.findOneAndDelete({ socketId: socket.id });
    } else {
      leftUser = inMemory.users[socket.id];
      delete inMemory.users[socket.id];
    }

    if (leftUser) {
      const room = leftUser.room || "global";
      const usersInRoom = USE_DB
        ? (await UserModel.find({ room }).select('-__v -_id'))
        : Object.values(inMemory.users).filter(u => u.room === room);

      io.in(room).emit("users_update", usersInRoom);
      console.log(`${leftUser.username} a quitté (${socket.id})`);
    }
  };

  socket.on("leave", async () => {
    await removeAndBroadcast();
  });

  socket.on("disconnect", async () => {
    console.log("disconnect:", socket.id);
    await removeAndBroadcast();
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur :${PORT}`);
});
