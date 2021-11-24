const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
/** */

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

/**
 *
 */
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("server: a new user just connected");
  socket.emit("newMessage", {
    from:"admin",
    text:"welcome to chat app",
    createAt: new Date().getTime(),
  })
  socket.broadcast.emit("newMessage", {
    from:"admin",
    text:"new user joined",
    createAt: new Date().getTime(),
  })
  socket.broadcast.emit("newMessage", {
    from:"admin",
    text:"hi new user",
    createAt: new Date().getTime(),
  })
  socket.on("createMessage", (message) => {
    console.log("createMessage: ", message);
    socket.broadcast.emit("newMessage", {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime(),
    });
  });
  socket.on("disconnect", () => {
    console.log("server: User disconnected");
  });
});

/**
 *
 *
 */
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
