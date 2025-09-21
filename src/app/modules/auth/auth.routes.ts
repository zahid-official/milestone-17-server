import { Router } from "express";
import { Role } from "../user/user.interface";
import authController from "./auth.controller";
import validateToken from "../../middlewares/validateToken";
import validateSchema from "../../middlewares/validateSchema";
import {
  changePasswordZodSchema,
  forgotPasswordZodSchema,
  resetPasswordZodSchema,
  sendOtpZodSchema,
  verifyOtpZodSchema,
} from "./auth.validation";

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

// Patch routes
router.patch(
  "/change-password",
  validateToken(...Object.values(Role)),
  validateSchema(changePasswordZodSchema),
  authController.changePassword
);
router.patch(
  "/forgot-password",
  validateSchema(forgotPasswordZodSchema),
  authController.forgotPassword
);
router.patch(
  "/reset-password",
  validateToken(...Object.values(Role)),
  validateSchema(resetPasswordZodSchema),
  authController.resetPassword
);

// Export auth routes
const authRoutes = router;
export default authRoutes;
