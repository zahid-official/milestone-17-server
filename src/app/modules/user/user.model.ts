import { model, Schema } from "mongoose";
import {
  IUser,
  AccountStatus,
  IAuthProvider,
  Role,
  IVehicle,
  VehicleType,
  AvailabilityStatus,
} from "./user.interface";

// Define vehicle schema
const vehicleSchema = new Schema<IVehicle>(
  {
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
    },
    vehicleModel: { type: String },
    plateNumber: { type: String, unique: true, sparse: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

// Define auth provider schema
const authProvider = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

// Mongoose schema for user model
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    picture: { type: String },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(Role), default: Role.RIDER },
    auths: [authProvider],
    rides: [{ type: Schema.Types.ObjectId, ref: "Ride" }],

    licenseNumber: { type: String, unique: true, sparse: true },
    vehicleInfo: vehicleSchema,
    availability: {
      type: String,
      enum: Object.values(AvailabilityStatus),
    },

    emergencyContact: { type: String },
    emergencyContact2: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Create mongoose model from user schema
const User = model<IUser>("User", userSchema, "userCollection");
export default User;
