/* eslint-disable @typescript-eslint/no-explicit-any */
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
      `You have a ride request with status '${rideRequest[0].status}'. You can request a new ride once the current ride is completed or cancelled.`
    );
  }

  // Set the requestedAt timestamp
  payload.timestamps = {
    requestedAt: new Date(),
  };

  // Create ride and add ride reference to user
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

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    cancelledAt: new Date(),
  };

  ride.status = RideStatus.CANCELLED;
  await ride.save();
  return ride;
};

// Accept a ride
const acceptRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only rides with status 'REQUESTED' can be accepted"
    );
  }

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    acceptedAt: new Date(),
  };

  ride.status = RideStatus.ACCEPTED;
  await ride.save();
  return ride;
};

// Reject a ride
const rejectRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only rides with status 'REQUESTED' can be rejected"
    );
  }

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    rejectedAt: new Date(),
  };

  ride.status = RideStatus.REJECTED;
  await ride.save();
  return ride;
};

// Pick up a rider
const pickUpRider = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.status !== RideStatus.ACCEPTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only rides with status 'ACCEPTED' can be marked as 'PICKED_UP'"
    );
  }

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    pickedUpAt: new Date(),
  };

  ride.status = RideStatus.PICKED_UP;
  await ride.save();
  return ride;
};

// Ride in transit
const inTransitRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.status !== RideStatus.PICKED_UP) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only rides with status 'PICKED_UP' can be marked as 'IN_TRANSIT'"
    );
  }

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    inTransitAt: new Date(),
  };

  ride.status = RideStatus.IN_TRANSIT;
  await ride.save();
  return ride;
};

// Complete a ride
const completeRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.status !== RideStatus.IN_TRANSIT) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only rides with status 'IN_TRANSIT' can be marked as 'COMPLETED'"
    );
  }

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    completedAt: new Date(),
  };

  ride.status = RideStatus.COMPLETED;
  await ride.save();
  return ride;
};

// Ride service object
const rideService = {
  getAllRequestedRides,
  requestRide,
  cancelRide,
  acceptRide,
  rejectRide,
  pickUpRider,
  inTransitRide,
  completeRide,
};

export default rideService;
