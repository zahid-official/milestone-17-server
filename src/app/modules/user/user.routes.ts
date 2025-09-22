import { Router } from "express";
import { Role } from "./user.interface";
import userController from "./user.controller";
import validateToken from "../../middlewares/validateToken";
import validateSchema from "../../middlewares/validateSchema";
import { registerUserZodSchema, updateUserZodSchema } from "./user.validation";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), userController.getAllUsers);
router.get(
  "/singleUser/:id",
  validateToken(Role.ADMIN),
  userController.getSingleUser
);
router.get(
  "/profile",
  validateToken(...Object.values(Role)),
  userController.getProfileInfo
);

// Post routes
router.post(
  "/register",
  validateSchema(registerUserZodSchema),
  userController.registerUser
);

// Patch routes
router.patch(
  "/update/:id",
  validateToken(...Object.values(Role)),
  validateSchema(updateUserZodSchema),
  userController.updateUser
);
router.patch("/block/:id", validateToken(Role.ADMIN), userController.blockUser);

// Export user routes
const userRoutes = router;
export default userRoutes;
