import express from "express";
import routeController from "../controllers/route.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  routeController.createRoute,
);
router.get("/", routeController.getRoutes);
router.get("/:id", routeController.getRouteById);

export default router;
