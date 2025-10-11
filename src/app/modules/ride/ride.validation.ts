import z from "zod";
import { PaymentMethod } from "./ride.interface";
import { Types } from "mongoose";

// Zod scheme for ride request validation
export const rideRequestZodSchema = z.object({
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

  // Fare
  fare: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Fare is required"
          : "Fare must be a number",
    })
    .min(1, "Distance must be a positive integer"),

  // Payment Method
  paymentMethod: z.enum(Object.values(PaymentMethod) as [string]),
});
