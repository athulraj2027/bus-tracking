import express from "express";
import authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import usersController from "../controllers/users.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  usersController.getUsers,
);

router.post("/signup", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

export default router;
