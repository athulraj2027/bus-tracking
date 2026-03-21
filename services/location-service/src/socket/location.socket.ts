import { Server, Socket } from "socket.io";
import { updateLocation } from "../services/redis.services.js";

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join:bus", (busId: string) => {
      socket.join(`bus:${busId}`);
    });

    socket.on("location:update", async (data) => {
      const { busId, lat, lng } = data;

      const saved = await updateLocation(busId, lat, lng);

      io.to(`bus:${busId}`).emit("location:live", {
        busId,
        ...saved,
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
