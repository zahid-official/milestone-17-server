/* eslint-disable @typescript-eslint/no-explicit-any */
import Driver from "./driver.model";
import User from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../utils/queryBuilder";
import {
  AccountStatus,
  AvailabilityStatus,
  Role,
} from "../user/user.interface";
import { IDriver } from "./driver.interface";
import Ride from "../ride/ride.model";
import { IRide } from "../ride/ride.interface";

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
    .populate("userId", "name email phone role accountStatus");

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

// Get rides history (Driver only)
const ridesHistory = async (userId: string, query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["pickup", "destination", "vehicleType"];

  const queryBuilder = new QueryBuilder<IRide>(
    Ride.find({ driverId: userId }),
    query
  );
  const rides = await queryBuilder
    .sort()
    .filter()
    .dateRangeFilter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build()
    .populate("driverId", "name email phone")
    .populate("userId", "name email phone")
    .lean<IRide[]>();

  // Get driver info
  const ridesData = await Promise.all(
    rides.map(async (ride) => {
      if (!ride.driverId) {
        return { ...ride, driverInfo: null };
      }

      const driverInfo = await User.findById(ride.driverId).select(
        "-_id name email accountStatus role licenseNumber vehicleInfo"
      );

      return { ...ride, driverInfo: driverInfo || null };
    })
  );

  // Get meta data for pagination
  const meta = await queryBuilder.meta();
  return {
    data: ridesData,
    meta,
  };
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

  // Approve the driver application
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

  // Reject the driver application
  driver.availability = undefined;
  await driver.save();
  await User.findByIdAndUpdate(driver.userId, { role: Role.RIDER });
  return driver;
};

// Suspend driver
const suspendDriver = async (driverId: string) => {
  const driver = await User.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.accountStatus === AccountStatus.SUSPENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This driver is already suspended"
    );
  }

  // Suspend the driver
  driver.accountStatus = AccountStatus.SUSPENDED;
  driver.availability = AvailabilityStatus.OFFLINE;
  await driver.save();
  return null;
};

// Unsuspend driver
const unsuspendDriver = async (driverId: string) => {
  const driver = await User.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.accountStatus === AccountStatus.ACTIVE) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This driver is already unsuspended"
    );
  }

  // Suspend the driver
  driver.accountStatus = AccountStatus.ACTIVE;
  driver.availability = AvailabilityStatus.ONLINE;
  await driver.save();
  return null;
};

// Update driver details
const updateDriverDetails = async (
  driverId: string,
  decodedToken: JwtPayload,
  payload: Partial<IDriver>
) => {
  const driver = await Driver.findById(driverId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (
    decodedToken.role === Role.DRIVER &&
    decodedToken.userId !== driver.userId.toString()
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this driver details"
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
  payload: Partial<IDriver>
) => {
  const driver = await User.findById(userId);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  // Update driver details
  const updatedDriver = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedDriver;
};

// Driver service object
const driverService = {
  getAllDriverApplications,
  getSingleDriverApplication,
  ridesHistory,
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
