let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

// app.get("/", function (req, res) {
//   res.send("Hello world");
//   console.log("Something connected to express");
// });

app.use(express.static("app"));

var messages = [
  {
    userId: 1,
    messageId: 10,
    userName: "Asha Greyjoy",
    content: {
      text: "The stone tree of the Stonetrees.",
      link: "http://awoiaf.westeros.org/index.php/House_Stonetree",
    },
    likedBy: [1],
    ts: Date.now() - 10000,
  },
  {
    userId: 2,
    messageId: 11,
    userName: "Arya Stark",
    content: {
      text: "We'll come see this inn.",
      link: "http://gameofthrones.wikia.com/wiki/Inn_at_the_Crossroads",
    },
    likedBy: [2, 3],
    ts: Date.now() - 100000,
  },
  {
    userId: 3,
    messageId: 14,
    userName: "Cersei Lannister",
    content: {
      text: "Her scheming forced this on me.",
      link: "http://gameofthrones.wikia.com/wiki/Margaery_Tyrell",
    },
    likedBy: [],
    ts: Date.now() - 1000000,
  },
];

io.on("connection", function (socket) {
  console.log("Something connected socket.io");
  console.log("geldi");

  socket.emit("messages", messages);
  console.log("geldi2");
  socket.on("new-message", (d) => {
    console.log("geldi3");
    messages.push(d);
    io.sockets.emit("messages", messages);
  });
});

server.listen(80);
