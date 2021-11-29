const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
/** */
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/isRealString");
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
  socket.on("join", (params, callback) => {
    if (!isRealString(params.email) || !isRealString(params.pass)) {
      callback("email or password is incorrect");
    }
    socket.join(params.email, params.pass);

    socket.emit("newMessage", generateMessage("admin", "welcome to chat app!"));
    socket.broadcast.emit(
      "newMessage",
      generateMessage("admin", "new user joined")
    );
    callback();
  });

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage: ", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("admin", coords.lat, coords.lng)
    );
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
