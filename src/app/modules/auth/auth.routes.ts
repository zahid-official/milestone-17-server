import { Router } from "express";
import authController from "./auth.controller";

// Initialize router
const router = Router();

// Get routes
router.get("/regenerate-token", authController.regenerateAccessToken);

// Post routes
router.post("/login", authController.credentialsLogin);
router.post("/logout", authController.logout);
router.post("/otpVerfication", authController.otpVerification);

// Export auth routes
const authRoutes = router;
export default authRoutes;
