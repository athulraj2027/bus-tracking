const { io } = require("socket.io-client");

const socket = io("http://localhost:3003");

setInterval(() => {
  const data = {
    busId: "bus123",
    lat: 12.97 + Math.random() / 100,
    lng: 77.59 + Math.random() / 100,
  };

  console.log("🚗 Sending:", data);

  socket.emit("location:update", data);
}, 2000);