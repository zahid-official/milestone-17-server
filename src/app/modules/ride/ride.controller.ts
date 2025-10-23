/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import rideService from "./ride.service";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Get all rides (Admin only)
const getAllRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const result = await rideService.getAllRides(
      query as Record<string, string>
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rides retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// Get all rides analytics (Admin only)
const rideAnalytics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const result = await rideService.rideAnalytics(
      query as Record<string, string>
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rides analytics retrieved successfully",
      data: result,
    });
  }
);

// Get single rides
const getSingleRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const result = await rideService.getSingleRide(rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride Details retrieved successfully",
      data: result,
    });
  }
);

// Get active ride (Rider only)
const activeRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.decodedToken?.userId;
    const result = await rideService.activeRide(userId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Active ride details retrieved successfully",
      data: result,
    });
  }
);

// Get driver current ride (Driver only)
const driverCurrentRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.decodedToken?.userId;
    const result = await rideService.driverCurrentRide(userId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Current active ride details retrieved successfully",
      data: result,
    });
  }
);

// Get all requested rides (Admin and Driver only)
const getAllRequestedRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const result = await rideService.getAllRequestedRides(
      query as Record<string, string>
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Requested rides retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// View ride history (Rider only)
const viewRideHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const userId = req?.decodedToken?.userId;
    const result = await rideService.viewRideHistory(
      userId,
      query as Record<string, string>
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride history retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// Request a ride (Rider only)
const requestRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req?.body;
    const userId = req?.decodedToken?.userId;
    const result = await rideService.requestRide(userId, body);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride requested successfully",
      data: result,
    });
  }
);

// Cancel a ride (Rider only)
const cancelRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const userId = req?.decodedToken?.userId;
    const result = await rideService.cancelRide(userId, rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride cancelled successfully",
      data: result,
    });
  }
);

// Accept a ride (Driver only)
const acceptRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const driverId = req?.decodedToken?.userId;
    const result = await rideService.acceptRide(driverId, rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride accepted successfully",
      data: result,
    });
  }
);

// Reject a ride (Driver only)
const rejectRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const driverId = req?.decodedToken?.userId;
    const result = await rideService.rejectRide(driverId, rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride rejected successfully",
      data: result,
    });
  }
);

// Pick up a rider (Driver only)
const pickUpRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const result = await rideService.pickUpRider(rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rider picked up successfully",
      data: result,
    });
  }
);

// Ride in transit (Driver only)
const inTransitRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const result = await rideService.inTransitRide(rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride is now in transit",
      data: result,
    });
  }
);

// Complete a ride (Driver only)
const completeRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const result = await rideService.completeRide(rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride completed successfully",
      data: result,
    });
  }
);

// Ride controller object
const rideController = {
  getAllRides,
  rideAnalytics,
  getSingleRide,
  activeRide,
  driverCurrentRide,
  getAllRequestedRides,
  viewRideHistory,
  requestRide,
  cancelRide,
  acceptRide,
  rejectRide,
  pickUpRider,
  inTransitRide,
  completeRide,
};

export default rideController;
