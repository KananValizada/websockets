let userId = localStorage.getItem("userId") || randomID();
localStorage.setItem("userId", userId);
console.log("Hi I am user #" + userId);
let messageCache;

function randomID() {
  return Math.floor(Math.random() * 1e11);
}

let socket = io.connect("http://localhost", { forceNew: true });
socket.on("messages", function (data) {
  console.log(data);
  messageCache = data;

  render();
});

function render() {
  let data = messageCache;

  let html = data
    .sort((a, b) => a.ts - b.ts)
    .map((d, index) => {
      return `<form class='message' onsubmit="return likeMessage(messageCache[${index}])">
            <div class='name'>
                ${d.userName}
          </div>
          <a href=${d.content.link} class='message' target=blank>
            ${d.content.text}
          </a>
          <div class=time> ${moment(d.ts).fromNow()} </div>
          <input type=submit class="likes-count" value="${
            d.likedBy.length
          } Likes">
          </form>
          `;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function likeMessage(message) {
  console.log("liked");
  let index = message.likedBy.indexOf(userId);

  if (index < 0) {
    message.likedBy.push(userId);
  } else {
    message.likedBy.splice(index, 1);
  }

  socket.emit("update-message", message);
  render();

  return false;
}

const addMessage = (e) => {
  console.log("yuppi");
  let payload = {
    messageId: randomID(),
    userName: document.getElementById("username").value,
    content: {
      text: document.getElementById("message").value,
      link: document.getElementById("linkAddress").value,
    },
    likedBy: [],
    ts: Date.now(),
  };

  socket.emit("new-message", payload);
  return false;
};

// let form = document.getElementById("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   addMessage(e);
// });
