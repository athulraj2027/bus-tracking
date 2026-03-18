import express from "express";

import routeRoutes from "./routes.routes.js";
import busController from "../controllers/bus.controller.js";
const router = express.Router();

router.use("/routes", routeRoutes);

router.post("/", busController.createBus);
router.patch("/:id", busController.editBus);
router.get("/", busController.getBuses);
router.get("/:id", busController.getBus);

export default router;
