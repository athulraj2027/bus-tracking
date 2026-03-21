const { io } = require("socket.io-client");

// connect to your location service
const socket = io("http://localhost:3003");

// join bus room
socket.emit("join:bus", "bus123");

// listen for live updates
socket.on("location:live", (data) => {
  console.log("📍 LIVE LOCATION:", data);
});
