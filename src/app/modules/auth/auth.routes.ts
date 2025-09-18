import { Router } from "express";
import authController from "./auth.controller";
import validateSchema from "../../middlewares/validateSchema";
import { sendOtpZodSchema, verifyOtpZodSchema } from "./auth.validation";

// Initialize router
const router = Router();

// Get routes
router.get("/regenerate-token", authController.regenerateAccessToken);

// Post routes
router.post("/login", authController.credentialsLogin);
router.post("/logout", authController.logout);
router.post(
  "/sendOTP",
  validateSchema(sendOtpZodSchema),
  authController.sendOTP
);
router.post(
  "/verifyOTP",
  validateSchema(verifyOtpZodSchema),
  authController.verifyOTP
);

// Export auth routes
const authRoutes = router;
export default authRoutes;
