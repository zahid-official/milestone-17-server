import z from "zod";
import { Types } from "mongoose";

// Zod scheme for
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

  // Pickup
  pickup: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Pickup is required"
          : "Pickup must be a string",
    })
    .min(2, { error: "Pickup must be at least 2 characters long." })
    .max(50, { error: "Pickup cannot exceed 50 characters." })
    .trim(),

  // Destination
  destination: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Destination is required"
          : "Destination must be a string",
    })
    .min(2, { error: "Destination must be at least 2 characters long." })
    .max(50, { error: "Destination cannot exceed 50 characters." })
    .trim(),

  // Distance
  distance: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Distance is required"
          : "Distance must be a number",
    })
    .min(1, "Distance must be a positive integer"),
});
