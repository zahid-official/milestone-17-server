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
  completedRides?: Types.ObjectId[];
  availability?: AvailabilityStatus;
}
