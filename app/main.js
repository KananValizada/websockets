let socket = io.connect("http://localhost", { forceNew: true });
socket.on("messages", function (data) {
  console.log(data);

  let html = data
    .map((d) => {
      return `<div class='name'>
                ${d.userName}
          </div>
          <a href=${d.content.link} class='message' target=blank>
            ${d.content.text}
          </a>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
});

const addMessage = (e) => {
  console.log("yuppi");
  let payload = {
    userName: document.getElementById("username").value,
    content: {
      text: document.getElementById("message").value,
      link: document.getElementById("linkAddress").value,
    },
    ts: Date.now(),
  };

  socket.emit("new-message", payload);
  return false;
};

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("aaaa");
  addMessage(e);
});
