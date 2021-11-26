let socket = io();
socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("newMessage", (message) => {
  console.log("new message", message);
  let li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`;
  document.querySelector("body").appendChild(li);
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

document.getElementById("submit_btn").addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.getElementById("message").value,
    },
    () => {
      document.getElementById("message").value = "";
    }
  );
});
document.getElementById("send_loc").addEventListener("click", (e) => {
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
});
