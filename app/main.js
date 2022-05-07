let socket = io.connect("http://localhost", { forceNew: true });
socket.on("messages", function (data) {
  console.log(data);
});
