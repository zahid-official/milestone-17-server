import { model, Schema } from "mongoose";
import {
  AvailabilityStatus,
  DriverStatus,
  IDriver,
  VehicleType,
} from "./driver.interface";

// Mongoose schema for driver model
const driverSchema = new Schema<IDriver>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  licenseNumber: { type: String, required: true },
  vehicleInfo: {
    type: {
      type: String,
      enum: Object.values(VehicleType),
      required: true,
    },
    model: { type: String, required: true },
    plateNumber: { type: String, required: true },
  },
  isDeleted: { type: Boolean, default: false },

  status: {
    type: String,
    enum: Object.values(DriverStatus),
    default: DriverStatus.PENDING,
  },
  availability: {
    type: String,
    enum: Object.values(AvailabilityStatus),
    default: AvailabilityStatus.ONLINE,
  },
});

// Create mongoose model from driver schema
const Driver = model<IDriver>("Driver", driverSchema, "driverCollection");
export default Driver;
