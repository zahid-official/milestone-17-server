import Ride from "./ride.model";
import User from "../user/user.model";
import { IRide, RideStatus } from "./ride.interface";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";

// Get all requested rides (Admin and Driver only)
const getAllRequestedRides = async () => {
  const rides = await Ride.find({ status: RideStatus.REQUESTED }).populate(
    "userId",
    "name email phone"
  );
  return rides;
};

// Request a ride
const requestRide = async (userId: string, payload: Partial<IRide>) => {
  if (userId !== payload?.userId?.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to request a ride. Please login to your account and try again"
    );
  }

  const user = await User.findById(payload?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user?.phone) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please update your profile with phone number before requesting a ride"
    );
  }

  if (payload.distance) {
    payload.fare = payload.distance * 5;
  }

  const rideRequest = await Ride.find({
    userId: payload.userId,
    status: {
      $nin: [RideStatus.COMPLETED, RideStatus.CANCELLED, RideStatus.REJECTED],
    },
  });
  if (rideRequest.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have a pending ride request. Please complete or cancel the existing ride before requesting a new one"
    );
  }

  const ride = await Ride.create(payload);
  await User.findByIdAndUpdate(payload.userId, {
    $push: { rides: ride._id },
  });
  return ride;
};

// Cancel a ride
const cancelRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }
  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only rides with status 'REQUESTED' can be cancelled"
    );
  }

  ride.status = RideStatus.CANCELLED;
  await ride.save();
  return ride;
};

// Ride service object
const rideService = {
  getAllRequestedRides,
  requestRide,
  cancelRide,
};

export default rideService;
