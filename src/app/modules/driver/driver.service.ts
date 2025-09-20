import User from "../user/user.model";
import httpStatus from "http-status-codes";
import { IDriver } from "./driver.interface";
import AppError from "../../errors/AppError";
import Driver from "./driver.model";

// Application for becoming a driver
const becomeDriver = async (userId: string, payload: Partial<IDriver>) => {
  const user = await User.findById(payload?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (userId !== payload.userId?.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to apply for driver. Please login to your account and try again"
    );
  }

  const existingDriver = await Driver.findOne({ userId: payload.userId });
  if (existingDriver) {
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

// Driver service object
const driverService = {
  becomeDriver,
};
export default driverService;
