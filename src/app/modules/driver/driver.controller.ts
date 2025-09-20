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
      message: "Driver applications retrieved successfully",
      data: result,
    });
  }
);

// Driver application
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

// Driver controller object
const driverController = {
  getAllDriverApplications,
  becomeDriver,
};
export default driverController;
