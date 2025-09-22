import { Router } from "express";
import { Role } from "../user/user.interface";
import validateToken from "../../middlewares/validateToken";
import validateSchema from "../../middlewares/validateSchema";
import { rideRequestZodSchema } from "./ride.validation";
import rideController from "./ride.controller";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), rideController.getAllRides);
router.get("/:rideId", validateToken(Role.ADMIN), rideController.getSingleRide);
router.get(
  "/requestedRides",
  validateToken(Role.ADMIN, Role.DRIVER),
  rideController.getAllRequestedRides
);
router.get(
  "/history",
  validateToken(Role.RIDER),
  rideController.viewRideHistory
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
router.patch(
  "/pickUp/:rideId",
  validateToken(Role.DRIVER),
  rideController.pickUpRider
);
router.patch(
  "/inTransit/:rideId",
  validateToken(Role.DRIVER),
  rideController.inTransitRide
);
router.patch(
  "/complete/:rideId",
  validateToken(Role.DRIVER),
  rideController.completeRide
);

// Export ride routes
const rideRoutes = router;
export default rideRoutes;
