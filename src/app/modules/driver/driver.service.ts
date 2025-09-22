/* eslint-disable @typescript-eslint/no-explicit-any */
import Driver from "./driver.model";
import User from "../user/user.model";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { AccountStatus, Role } from "../user/user.interface";
import QueryBuilder from "../../utils/queryBuilder";
import {
  ApplicationStatus,
  AvailabilityStatus,
  IDriver,
} from "./driver.interface";

// Get all driver applications
const getAllDriverApplications = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = [
    "licenseNumber",
    "vehicleInfo.vehicleType",
    "vehicleInfo.plateNumber",
    "vehicleInfo.vehicleModel",
  ];

  const queryBuilder = new QueryBuilder<IDriver>(Driver.find(), query);
  const users = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build()
    .populate("userId", "name email phone role");

  // Get meta data for pagination
  const meta = await queryBuilder.meta();

  return {
    data: users,
    meta,
  };
};

// Get single driver applications
const getSingleDriverApplication = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver applicaion not found");
  }
  return driver;
};

// View earnings history (Driver only)
const viewEarningsHistory = async (userId: string) => {
  const user = await User.findById(userId).populate("rides");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user.rides;
};

// Application for becoming a driver
const becomeDriver = async (userId: string, payload: Partial<IDriver>) => {
  const user = await User.findById(payload?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (userId !== payload?.userId?.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to apply for driver. Please login to your account and try again"
    );
  }

  const existingDriver = await Driver.findOne({ userId: payload.userId });
  if (existingDriver?.applicationStatus === ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This application has already been approved"
    );
  }

  if (existingDriver?.applicationStatus === ApplicationStatus.PENDING) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already applied for driver. Please wait for the approval"
    );
  }

  const existingLicense = await Driver.findOne({
    licenseNumber: payload.licenseNumber,
  });
  if (existingLicense) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This license number is already in use. Please provide a different license number"
    );
  }

  const existingPlate = await Driver.findOne({
    "vehicleInfo.plateNumber": payload.vehicleInfo?.plateNumber,
  });
  if (existingPlate) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This vehicle plate number is already in use. Please provide a different plate number"
    );
  }

  const driver = await Driver.create(payload);
  return driver;
};

// Approve driver
const approveDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.applicationStatus === ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This application has already been approved"
    );
  }

  // Approve the driver application
  driver.applicationStatus = ApplicationStatus.APPROVED;
  driver.availability = AvailabilityStatus.ONLINE;
  await driver.save();
  await User.findByIdAndUpdate(driver.userId, { role: Role.DRIVER });
  return driver;
};

// Reject driver
const rejectDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.applicationStatus === ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This application has already been approved. You cannot reject an approved application"
    );
  }

  if (driver.applicationStatus === ApplicationStatus.REJECTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This application has already been rejected"
    );
  }

  // Reject the driver application
  driver.applicationStatus = ApplicationStatus.REJECTED;
  driver.availability = undefined;
  await driver.save();
  await User.findByIdAndUpdate(driver.userId, { role: Role.RIDER });
  return driver;
};

// Suspend driver
const suspendDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.applicationStatus !== ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only approved drivers can be suspended"
    );
  }

  const user = await User.findById(driver.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
  }

  if (user.role !== Role.DRIVER) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The associated user is not a driver"
    );
  }

  if (user.accountStatus === AccountStatus.SUSPENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This driver is already suspended"
    );
  }

  // Suspend the driver
  user.accountStatus = AccountStatus.SUSPENDED;
  await user.save();
  driver.availability = AvailabilityStatus.OFFLINE;
  await driver.save();
  return null;
};

// Unsuspend driver
const unsuspendDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.applicationStatus !== ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only approved drivers can be unsuspended"
    );
  }

  const user = await User.findById(driver.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
  }

  if (user.role !== Role.DRIVER) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The associated user is not a driver"
    );
  }

  if (user.accountStatus === AccountStatus.ACTIVE) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This driver is already unsuspended"
    );
  }

  // Suspend the driver
  user.accountStatus = AccountStatus.ACTIVE;
  await user.save();
  driver.availability = AvailabilityStatus.ONLINE;
  await driver.save();
  return null;
};

// Update driver details
const updateDriverDetails = async (
  userId: string,
  driverId: string,
  payload: Partial<IDriver>
) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (userId !== driver.userId.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this driver details"
    );
  }

  if (driver.applicationStatus !== ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only approved drivers can update their details"
    );
  }

  const existingLicense = await Driver.findOne({
    _id: { $ne: driverId },
    licenseNumber: payload.licenseNumber,
  });
  if (existingLicense) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This license number is already in use. Please provide a different license number"
    );
  }

  const existingPlate = await Driver.findOne({
    _id: { $ne: driverId },
    "vehicleInfo.plateNumber": payload.vehicleInfo?.plateNumber,
  });
  if (existingPlate) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This vehicle plate number is already in use. Please provide a different plate number"
    );
  }

  // Merge existing vehicle info with the new one
  if (payload.vehicleInfo) {
    payload.vehicleInfo = {
      ...(driver.vehicleInfo as any).toObject(),
      ...payload.vehicleInfo,
    };
  }

  // Update driver details
  const updatedDriver = await Driver.findByIdAndUpdate(driverId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedDriver;
};

// Update availability status
const availabilityStatus = async (
  userId: string,
  driverId: string,
  payload: Partial<IDriver>
) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (userId !== driver.userId.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this driver details"
    );
  }

  if (driver.applicationStatus !== ApplicationStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only approved drivers can update availability status"
    );
  }

  // Update driver details
  const updatedDriver = await Driver.findByIdAndUpdate(driverId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedDriver;
};

// Driver service object
const driverService = {
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

export default driverService;
