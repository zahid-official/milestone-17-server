import { Router } from "express";
import authController from "./auth.controller";

// Initialize router
const router = Router();

// Post routes
router.post("/login", authController.credentialsLogin);

// Export auth routes
const authRoutes = router;
export default authRoutes;
