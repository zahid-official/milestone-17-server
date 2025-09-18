import { Router } from "express";
import userController from "./user.controller";
import { registerUserZodSchema } from "./user.validation";
import validateSchema from "../../middlewares/validateSchema";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/register",
  validateSchema(registerUserZodSchema),
  userController.registerUser
);

// Export user routes
const userRoutes = router;
export default userRoutes;
