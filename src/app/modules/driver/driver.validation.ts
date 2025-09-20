import z from "zod";
import { Types } from "mongoose";
import { VehicleType } from "./driver.interface";

// IVehicle schema
const VehicleSchema = z.object({
  // Vehicle Type
  vehicleType: z.enum(Object.values(VehicleType)),

  // Vehicle Model
  vehicleModel: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Model is required"
          : "Model must be a string",
    })
    .min(2, { error: "Model must be at least 2 characters long." })
    .max(50, { error: "Model cannot exceed 50 characters." })
    .trim(),

  // Vehicle Plate Number
  plateNumber: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Plate Number is required"
          : "Plate Number must be a string",
    })
    .min(2, { error: "Plate Number must be at least 2 characters long." })
    .max(50, { error: "Plate Number cannot exceed 50 characters." })
    .trim(),
});

// Zod scheme for becoming a driver
export const becomeDriverZodSchema = z.object({
  // UserId
  userId: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "UserId is required"
          : "UserId must be a string objectId",
    })
    .refine((value) => Types.ObjectId.isValid(value), {
      error: "Invalid ObjectId",
    })
    .trim(),

  // License Number
  licenseNumber: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "License number is required"
          : "License number must be a string",
    })
    .min(2, { error: "License number must be at least 2 characters long." })
    .max(50, { error: "License number cannot exceed 50 characters." })
    .trim(),

  // Vehicle Info
  vehicleInfo: VehicleSchema,
});
