import express, { type Request, type Response } from "express";
import healthController from "../controllers/health.controller.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("hjf");
  res.send("server working");
});

router.get("/health", healthController.getHealth);

export default router;
