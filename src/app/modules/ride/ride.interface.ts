import { Types } from "mongoose";
import { IVehicle } from "../user/user.interface";

export enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
}

export interface ITimestamp {
  requestedAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  cancelledAt?: Date;
  pickedUpAt?: Date;
  inTransitAt?: Date;
  completedAt?: Date;
}

export enum PaymentMethod {
  CASH = "CASH",
  ONLINE = "ONLINE",
}

// Driver info
export interface IDriverUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
}

export interface IDriverInfo {
  _id: Types.ObjectId;
  userId: IDriverUser;
  licenseNumber: string;
  vehicleInfo: IVehicle;
}

export interface IRide {
  userId: Types.ObjectId;
  driverId?: Types.ObjectId;
  driverInfo?: IDriverInfo;

  pickup: string;
  distance: number;
  destination: string;

  fare?: number;
  paymentMethod?: PaymentMethod;
  status: RideStatus;
  timestamps?: ITimestamp;
}
