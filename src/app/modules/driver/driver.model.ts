import { model, Schema } from "mongoose";
import {
  AvailabilityStatus,
  DriverStatus,
  IDriver,
  IVehicle,
  VehicleType,
} from "./driver.interface";

// Define vehicle schema
const vehicleSchema = new Schema<IVehicle>(
  {
    type: { type: String, enum: Object.values(VehicleType), required: true },
    model: { type: String, required: true },
    plateNumber: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

// Mongoose schema for driver model
const driverSchema = new Schema<IDriver>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  licenseNumber: { type: String, required: true },
  vehicleInfo: vehicleSchema,
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
