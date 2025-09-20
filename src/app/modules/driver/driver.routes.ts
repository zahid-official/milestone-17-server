import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import { becomeDriverZodSchema } from "./driver.validation";
import driverController from "./driver.controller";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";

// Initialize router
const router = Router();

// Get routes
router.get(
  "/applications",
  validateToken(Role.ADMIN),
  driverController.getAllDriverApplications
);
router.get(
  "/application/:driverId",
  validateToken(Role.ADMIN),
  driverController.getSingleDriverApplication
);

// Post routes
router.post(
  "/apply",
  validateToken(...Object.values(Role)),
  validateSchema(becomeDriverZodSchema),
  driverController.becomeDriver
);

// Patch routes
router.patch(
  "/approve/:driverId",
  validateToken(Role.ADMIN),
  driverController.approveDriver
);
router.patch(
  "/reject/:driverId",
  validateToken(Role.ADMIN),
  driverController.rejectDriver
);

// Export driver routes
const driverRoutes = router;
export default driverRoutes;
