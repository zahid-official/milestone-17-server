import { Types } from "mongoose";

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

export interface IRide {
  userId: Types.ObjectId;
  driverId?: Types.ObjectId;

  pickup: string;
  distance: number;
  destination: string;

  fare?: number;
  paymentMethod?: PaymentMethod;
  status: RideStatus;
  timestamps?: ITimestamp;
}
