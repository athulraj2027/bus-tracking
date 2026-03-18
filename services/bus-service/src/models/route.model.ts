import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: String,
  stops: [
    {
      name: String,
      lat: Number,
      lng: Number,
      order: Number,
    },
  ],
});

const Route = mongoose.model("Route", routeSchema);
export default Route;
