import { model, Schema } from "mongoose";
import {
  ApplicationStatus,
  IDriver,
  IVehicle,
  VehicleType,
} from "./driver.interface";

// Define vehicle schema
const vehicleSchema = new Schema<IVehicle>(
  {
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: true,
    },
    vehicleModel: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

// Mongoose schema for driver model
const driverSchema = new Schema<IDriver>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    licenseNumber: { type: String, required: true, unique: true },
    vehicleInfo: vehicleSchema,

    applicationStatus: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create mongoose model from driver schema
const Driver = model<IDriver>("Driver", driverSchema, "driverCollection");
export default Driver;
