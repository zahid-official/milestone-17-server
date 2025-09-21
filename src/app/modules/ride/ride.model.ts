import { model, Schema } from "mongoose";
import { IRide, ITimestamp, RideStatus } from "./ride.interface";

// Define timestamps schema
const timestampsSchema = new Schema<ITimestamp>(
  {
    requestedAt: { type: Date, default: Date.now },
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
    driverId: { type: Schema.Types.ObjectId, ref: "Driver" },

    pickup: { type: String, required: true },
    distance: { type: Number, required: true },
    destination: { type: String, required: true },

    fare: { type: Number },
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
