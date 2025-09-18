import { Router } from "express";
import { Role } from "./user.interface";
import userController from "./user.controller";
import { registerUserZodSchema } from "./user.validation";
import validateToken from "../../middlewares/validateToken";
import validateSchema from "../../middlewares/validateSchema";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), userController.getAllUsers);
router.get("/:id", validateToken(Role.ADMIN), userController.getSingleUser);

// Post routes
router.post(
  "/register",
  validateSchema(registerUserZodSchema),
  userController.registerUser
);

// Export user routes
const userRoutes = router;
export default userRoutes;
