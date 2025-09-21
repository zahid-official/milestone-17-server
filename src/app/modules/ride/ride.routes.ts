import { Router } from "express";
import { Role } from "../user/user.interface";
import validateToken from "../../middlewares/validateToken";
import validateSchema from "../../middlewares/validateSchema";
import { rideRequestZodSchema } from "./ride.validation";
import rideController from "./ride.controller";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/request",
  validateToken(Role.RIDER),
  validateSchema(rideRequestZodSchema),
  rideController.requestRide
);

// Export ride routes
const rideRoutes = router;
export default rideRoutes;
