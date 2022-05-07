let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

// app.get("/", function (req, res) {
//   res.send("Hello world");
//   console.log("Something connected to express");
// });

app.use(express.static("app"));

io.on("connection", function (socket) {
  console.log("Something connected socket.io");
  socket.emit("messages", ["hello", "hi there", "how are you"]);
});

server.listen(80);
