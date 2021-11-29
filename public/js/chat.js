let socket = io();

socket.on("connect", () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  socket.emit("join", params, (err) => {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
    }
  });
  console.log("params: ", params);
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("newMessage", (message) => {
  const formattedTime = moment(message.createAt).format("LT");
  console.log("new message", message);
  let div = document.createElement("div");
  div.setAttribute("class", "col-xs-12 p-b-10 odd");
  div.innerHTML = `<div class="chat-image  profile-picture max-profile-picture"><img alt="${message.from}" src="storage/user_image/Bylancer.jpg"></div><div class="chat-body">  <div class="chat-text"><h4>${message.from}</h4><p>${message.text}</p><b>${formattedTime}</b><span class="msg-status msg-mega"><i class="fa fa-check"></i></span></div></div>`;
  document.querySelector("#chatbox_Deven").appendChild(div);
});
socket.on("newLocationMessage", (message) => {
  console.log("newLocationMessage", message);
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.setAttribute("href", message.url);
  a.innerText = "my current location";
  li.appendChild(a);
  document.querySelector("body").appendChild(li);
});
socket.emit("createMessage", { from: "john", text: "hey" }, () => {
  console.log("server got it");
});
const sendmessage = () => {
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector("#chatboxtextarea").value,
    },
    () => {
      document.querySelector("#chatboxtextarea").value = "";
    }
  );
};
const sendLocation = () => {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      socket.emit("createLocationMessage", {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    () => {
      alert("unable to fetch location");
    }
  );
};
