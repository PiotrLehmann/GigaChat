const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API runnin!!!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Serverrr on port ${PORT}`));

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
        origin: true, // for all
        // origin: "http://localhost:3000", // for desktop
      },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on('setup', (userId) => {
    socket.join(userId);
    console.log(userId);
    socket.emit('connected');
  });

  socket.on('join chat', (roomId) => {
    socket.join(roomId);
    console.log('User joined room: ' + roomId);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if(!chat.users) return console.log('chat.users not defined');

    chat.users.forEach(user => {
      if(user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived); //works in native too
    })
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userId);
  });
})