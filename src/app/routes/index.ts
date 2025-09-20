import { Router } from "express";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";
import driverRoutes from "../modules/driver/driver.routes";

// Initialize main router
const router = Router();

// List of route configs
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/driver",
    route: driverRoutes,
  },
];

// Register all routes
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Export main router
const moduleRouter = router;
export default moduleRouter;
