import { Router } from "express";
import { Role } from "../user/user.interface";
import validateToken from "../../middlewares/validateToken";
import validateSchema from "../../middlewares/validateSchema";
import { rideRequestZodSchema } from "./ride.validation";
import rideController from "./ride.controller";

// Initialize router
const router = Router();

// Get routes
router.get(
  "/requestedRides",
  validateToken(Role.ADMIN, Role.DRIVER),
  rideController.getAllRequestedRides
);

// Post routes
router.post(
  "/request",
  validateToken(Role.RIDER),
  validateSchema(rideRequestZodSchema),
  rideController.requestRide
);

// Patch routes
router.patch(
  "/cancel/:rideId",
  validateToken(Role.RIDER),
  rideController.cancelRide
);
router.patch(
  "/accept/:rideId",
  validateToken(Role.DRIVER),
  rideController.acceptRide
);
router.patch(
  "/reject/:rideId",
  validateToken(Role.DRIVER),
  rideController.rejectRide
);

// Export ride routes
const rideRoutes = router;
export default rideRoutes;
