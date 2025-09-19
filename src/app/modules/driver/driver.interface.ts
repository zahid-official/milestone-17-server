import { Types } from "mongoose";

// Defines vehicle types
export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
}

// Vehicle information interface
export interface IVehicle {
  type: VehicleType;
  model: string;
  plateNumber: string;
}

// Defines driver status
export enum DriverStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

// Defines driver availability
export enum AvailabilityStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  ON_RIDE = "ON_RIDE",
}

// Driver interface definition (focused on driver management only)
export interface IDriver {
  userId: Types.ObjectId;
  licenseNumber: string;
  isDeleted?: boolean;
  vehicleInfo: IVehicle;
  status?: DriverStatus;
  availability?: AvailabilityStatus;
  rides?: Types.ObjectId[];
  earnings?: Types.ObjectId[];
}
