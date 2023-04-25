const { log } = require("console");
const express = require("express");
const cors = require("cors");
const DBCon = require("./config/db/DBCon");
const notFound = require("./middlewares/Err/notFound");
const errorHandler = require("./middlewares/Err/errorHandler");
const UserRoute = require("./routes/UserRoutes");
const ChatRoute = require("./routes/ChatRoutes");
const MessageRoute = require("./routes/MessageRoutes");
const Server = require("socket.io");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

// DB Connection
DBCon();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
app.use("/api/user/", UserRoute);
app.use("/api/chat/", ChatRoute);
app.use("/api/msg/", MessageRoute);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  log(`App is listening on port ${port}`);
});

// const io = new Server(server, {
const io = Server(server, {
  pingTimeout: 30000,
  cors: {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  },
});

let c = 0;
io.on("connection", (socket) => {
  console.log("====================================");
  console.log(`Connected to ${socket.id}`, (c = c + 1));
  console.log("====================================");

  // This socket is trying to create/join a new room with the socket id assigned to the user whose data is getting passed from the client side. Why? So that anyone that wants to communicate with this user privately, can join this room
  socket.on("setup", (user) => {
    // created/joined the user's own room
    socket.join(user._id);
    console.log("====================================");
    console.log(`${user.name}'s room id: ${user._id}`);
    console.log("====================================");
    socket.emit("connected");
  });

  // This socket is trying to join a room to start comms with the users in that particular room or only with the room owner privately.
  socket.on("join room", (room, user) => {
    // the room here is basically the chat id of the selected user or the group chat id
    socket.join(room._id);
    console.log("====================================");
    console.log(`${user.name} joined room of: ${room._id}`);
    console.log("====================================");
  });

  // These two sockets is to check whether anyone is typing or not
  socket.on("typing", (room) => {
    socket.in(room._id).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room._id).emit("stop typing");
  });

  // This socket is trying receive the data/msg from the client in order to emit/send the data/msg to the supposed receiver
  socket.on("sendMsg", (newMsg) => {
    let { chat } = newMsg;

    if (!chat.users) return console.log("Chat users undefined!");
    chat.users.forEach((u) => {
      console.log(`Name: ${u.name} and isGroup? ${newMsg.chat.isGroupChat}`);
      if (u._id === newMsg.sender._id) return;

      if (newMsg.chat.isGroupChat) {
        socket.to(u._id).emit("receiveMsg", newMsg);
      } else {
        socket.to(chat._id).to(u._id).emit("receiveMsg", newMsg);
      }
    });
  });

  socket.off("setup", () => {
    console.log("====================================");
    console.log(`${user.name} is disconnected`);
    console.log("====================================");
    socket.leave(user._id);
  });

  socket.on("disconnect", () => console.log("User is disconnected"));
});
