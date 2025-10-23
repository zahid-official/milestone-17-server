import { model, Schema } from "mongoose";
import { IRide, ITimestamp, PaymentMethod, RideStatus } from "./ride.interface";
import { VehicleType } from "../user/user.interface";

// Define timestamps schema
const timestampsSchema = new Schema<ITimestamp>(
  {
    requestedAt: { type: Date },
    acceptedAt: { type: Date },
    rejectedAt: { type: Date },
    cancelledAt: { type: Date },
    pickedUpAt: { type: Date },
    inTransitAt: { type: Date },
    completedAt: { type: Date },
  },
  { _id: false, versionKey: false }
);

// Mongoose schema for ride model
const rideSchema = new Schema<IRide>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    driverId: { type: Schema.Types.ObjectId, ref: "User" },

    pickup: { type: String, required: true },
    distance: { type: Number, required: true },
    destination: { type: String, required: true },

    fare: { type: Number },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CASH,
    },
    timestamps: timestampsSchema,
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.REQUESTED,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create mongoose model from ride schema
const Ride = model<IRide>("Ride", rideSchema, "rideCollection");
export default Ride;
