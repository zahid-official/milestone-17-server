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

// Defines user roles
export enum Role {
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}

// Defines account status
export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
}

// Defines authentication provider interface
export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

// User interface definition
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  picture?: string;
  createdAt?: Date;
  isDeleted?: boolean;
  isVerified?: boolean;
  role: Role;
  accountStatus?: AccountStatus;
  auths: IAuthProvider[];
  rides?: Types.ObjectId[];

  licenseNumber?: string;
  vehicleInfo?: IVehicle;
  availability?: AvailabilityStatus;
}
