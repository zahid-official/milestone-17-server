/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import driverService from "./driver.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Get all driver applications
const getAllDriverApplications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const result = await driverService.getAllDriverApplications(
      query as Record<string, string>
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All driver applications retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// Get single driver applications
const getSingleDriverApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req?.params?.driverId;
    const result = await driverService.getSingleDriverApplication(driverId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver application retrieved successfully",
      data: result,
    });
  }
);

// View earnings history (Driver only)
const viewEarningsHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const userId = req?.decodedToken?.userId;
    const result = await driverService.viewEarningsHistory(userId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All driver applications retrieved successfully",
      data: result,
    });
  }
);

// Apply for becoming a driver
const becomeDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req?.body;
    const userId = req?.decodedToken?.userId;
    const result = await driverService.becomeDriver(userId, body);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver application submitted successfully",
      data: result,
    });
  }
);

// Approve driver
const approveDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req?.params?.driverId;
    const result = await driverService.approveDriver(driverId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver application approved successfully",
      data: result,
    });
  }
);

// Reject driver
const rejectDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req?.params?.driverId;
    const result = await driverService.rejectDriver(driverId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver application rejected successfully",
      data: result,
    });
  }
);

// Suspend driver
const suspendDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req?.params?.driverId;
    const result = await driverService.suspendDriver(driverId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver suspended successfully",
      data: result,
    });
  }
);

// Unsuspend driver
const unsuspendDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req?.params?.driverId;
    const result = await driverService.unsuspendDriver(driverId);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver unsuspended successfully",
      data: result,
    });
  }
);

// Update driver details
const updateDriverDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req?.body;
    const userId = req?.decodedToken?.userId;
    const driverId = req?.params?.driverId;
    const result = await driverService.updateDriverDetails(
      userId,
      driverId,
      body
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver details updated successfully",
      data: result,
    });
  }
);

// Update availablity status
const availabilityStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req?.body;
    const userId = req?.decodedToken?.userId;
    const driverId = req?.params?.driverId;
    const result = await driverService.availabilityStatus(
      userId,
      driverId,
      body
    );

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Driver details updated successfully",
      data: result,
    });
  }
);

// Driver controller object
const driverController = {
  getAllDriverApplications,
  getSingleDriverApplication,
  viewEarningsHistory,
  becomeDriver,
  approveDriver,
  rejectDriver,
  suspendDriver,
  unsuspendDriver,
  updateDriverDetails,
  availabilityStatus,
};
export default driverController;
