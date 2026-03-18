import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    driverId: String,
    routeId: String,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;