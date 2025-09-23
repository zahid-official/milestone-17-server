import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import {
  availabilityStatusZodSchema,
  becomeDriverZodSchema,
  updateDriverDetailsZodSchema,
} from "./driver.validation";
import driverController from "./driver.controller";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";

// Initialize router
const router = Router();

// Get routes
router.get(
  "/",
  validateToken(Role.ADMIN),
  driverController.getAllDriverApplications
);
router.get(
  "/singleDriver/:driverId",
  validateToken(Role.ADMIN),
  driverController.getSingleDriverApplication
);
router.get(
  "/earning",
  validateToken(Role.DRIVER),
  driverController.viewEarningsHistory
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
router.patch(
  "/suspend/:driverId",
  validateToken(Role.ADMIN),
  driverController.suspendDriver
);
router.patch(
  "/unsuspend/:driverId",
  validateToken(Role.ADMIN),
  driverController.unsuspendDriver
);

router.patch(
  "/updateDetails/:driverId",
  validateToken(Role.ADMIN, Role.DRIVER),
  validateSchema(updateDriverDetailsZodSchema),
  driverController.updateDriverDetails
);
router.patch(
  "/availability/:driverId",
  validateToken(Role.DRIVER),
  validateSchema(availabilityStatusZodSchema),
  driverController.availabilityStatus
);

// Export driver routes
const driverRoutes = router;
export default driverRoutes;
