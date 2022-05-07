let express = require("express");
let app = express();
let server = require("http").Server(app);

app.get("/", function (req, res) {
  res.send("Hello world");
  console.log("Something connected to express");
});

server.listen(80);
