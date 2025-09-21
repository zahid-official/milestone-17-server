/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import rideService from "./ride.service";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Get all requested rides (Admin and Driver only)
const getAllRequestedRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await rideService.getAllRequestedRides();

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Requested rides retrieved successfully",
      data: result,
    });
  }
);

// Request a ride
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

// Cancel a ride
const cancelRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req?.params?.rideId;
    const result = await rideService.cancelRide(rideId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Ride cancelled successfully",
      data: result,
    });
  }
);

// Ride controller object
const rideController = {
  getAllRequestedRides,
  requestRide,
  cancelRide,
};

export default rideController;
