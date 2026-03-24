import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    driverId: { type: String, default: null },
    routeId: String,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
  },
  { timestamps: true },
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
