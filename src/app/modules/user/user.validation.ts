import z from "zod";
import {
  AccountStatus,
  AvailabilityStatus,
  Role,
  VehicleType,
} from "./user.interface";

// Vehicle schema
const VehicleSchema = z.object({
  // Vehicle Type
  vehicleType: z.enum(Object.values(VehicleType)).optional(),

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
    .trim()
    .optional(),

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
    .trim()
    .optional(),
});

// Zod scheme for new user registration
export const registerUserZodSchema = z.object({
  // Name
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim(),

  // Email
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Invalid email format",
    })
    .min(5, { error: "Email must be at least 5 characters long." })
    .max(100, { error: "Email cannot exceed 100 characters." })
    .trim(),

  // Password
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be string",
    })
    .min(8, { error: "Password must be at least 8 characters long." })

    // Password complexity requirements
    .regex(/^(?=.*[A-Z])/, {
      error: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      error: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      error: "Password must contain at least 1 number.",
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
    .trim()
    .optional(),

  // Vehicle Info
  vehicleInfo: VehicleSchema.optional(),

  // Availablity
  availability: z.enum(Object.values(AvailabilityStatus)).optional(),
});

// Zod scheme for updating user data
export const updateUserZodSchema = z.object({
  // Name
  name: z
    .string({ error: "Name must be string" })
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim()
    .optional(),

  // Phone
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .trim()
    .optional(),

  // Address
  address: z
    .string({ error: "Address must be string" })
    .max(200, { error: "Address cannot exceed 200 characters." })
    .trim()
    .optional(),

  // Delete status
  isDeleted: z.boolean({ error: "isDeleted must be true or false" }).optional(),

  // Verification status
  isVerified: z
    .boolean({ error: "isVerified must be true or false" })
    .optional(),

  // Role
  role: z.enum(Object.values(Role) as [string]).optional(),

  // Account status
  accountStatus: z.enum(Object.values(AccountStatus) as [string]).optional(),

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
    .trim()
    .optional(),

  // Vehicle Info
  vehicleInfo: VehicleSchema.optional(),

  // Availablity
  availability: z.enum(Object.values(AvailabilityStatus)).optional(),

  // Emergency Contact
  emergencyContact: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .trim()
    .optional(),

  // Emergency Contact 2
  emergencyContact2: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .trim()
    .optional(),
});
