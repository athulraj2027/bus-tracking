import express from "express";

import routeRoutes from "./routes.routes.js";
import busController from "../controllers/bus.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = express.Router();

router.use("/routes", routeRoutes);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  busController.createBus,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  busController.editBus,
);

router.get("/", busController.getBuses);
router.get("/:id", busController.getBus);

router.patch(
  "/:busId/assign-driver",
  authMiddleware,
  roleMiddleware("ADMIN"),
  busController.assignDriver,
);

export default router;
