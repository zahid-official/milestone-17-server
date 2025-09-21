import { Types } from "mongoose";

// Defines vehicle types
export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
}

// Vehicle information interface
export interface IVehicle {
  vehicleType: VehicleType;
  vehicleModel: string;
  plateNumber: string;
}

// Defines driver application status
export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
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
  vehicleInfo: IVehicle;
  rides?: Types.ObjectId[];
  availability?: AvailabilityStatus;
  applicationStatus?: ApplicationStatus;
}
