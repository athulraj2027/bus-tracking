import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  order: {
    type: Number,
    required: true,
  },
});

const routeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stops: [stopSchema],
  },
  { timestamps: true },
);

// Geo index (VERY IMPORTANT for your project)
routeSchema.index({ "stops.location": "2dsphere" });

const Route = mongoose.model("Route", routeSchema);
export default Route;
