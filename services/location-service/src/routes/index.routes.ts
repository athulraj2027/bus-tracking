import express from "express";
import locationController from "../controllers/location.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = express.Router();

router.get("/:busId", locationController.getLocationByBusId);
router.post(
  "/:busId",
  authMiddleware,
  roleMiddleware("DRIVER"),
  locationController.updateLocationByBusId,
);

export default router;
