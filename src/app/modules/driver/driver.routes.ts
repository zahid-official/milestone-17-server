import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import { becomeDriverZodSchema } from "./driver.validation";
import driverController from "./driver.controller";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/apply",
  validateToken(...Object.values(Role)),
  validateSchema(becomeDriverZodSchema),
  driverController.becomeDriver
);

// Export driver routes
const driverRoutes = router;
export default driverRoutes;
