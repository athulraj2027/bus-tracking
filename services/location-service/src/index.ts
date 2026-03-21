import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import Routes from "./routes/index.routes.js";
import { redis } from "./redis/redis.js";
import { initSocket } from "./socket/location.socket.js";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

initSocket(io);
server.listen(PORT, () => {
  console.log(`Location service running at ${PORT}`);
});
