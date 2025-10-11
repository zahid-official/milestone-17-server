/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../utils/queryBuilder";
import Driver from "../driver/driver.model";
import User from "../user/user.model";
import { IDriverUser, IRide, RideStatus } from "./ride.interface";
import Ride from "./ride.model";

// Get all rides (Admin only)
const getAllRides = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["pickup", "destination", "status"];

  const queryBuilder = new QueryBuilder<IRide>(Ride.find(), query);
  const rides = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build()
    .populate("userId", "name email phone");

  // Get meta data for pagination
  const meta = await queryBuilder.meta();

  return {
    data: rides,
    meta,
  };
};

// Get single ride
const getSingleRide = async (rideId: string) => {
  // Get the ride and populate rider info
  const ride = await Ride.findById(rideId)
    .populate("userId", "name email phone")
    .lean<IRide | null>();

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  // Get driver info if driverId exists
  let driverInfo = null;
  if (ride.driverId) {
    driverInfo = await Driver.findOne({ userId: ride.driverId })
      .select("-applicationStatus -completedRides -createdAt -updatedAt")
      .populate<{ userId: IDriverUser }>("userId", "name email phone")
      .lean();
  }

  return {
    ...ride,
    driverInfo: driverInfo || null,
  };
};

// Get active ride
const activeRide = async () => {
  const ride = await Ride.findOne({
    status: {
      $nin: [RideStatus.COMPLETED, RideStatus.CANCELLED, RideStatus.REJECTED],
    },
  });
  return ride;
};

// Get all requested rides (Admin and Driver only)
const getAllRequestedRides = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["pickup", "destination", "status"];

  const queryBuilder = new QueryBuilder<IRide>(
    Ride.find({ status: RideStatus.REQUESTED }),
    query
  );
  const rides = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build()
    .populate("userId", "name email phone");

  // Get meta data for pagination
  const meta = await queryBuilder.meta();

  return {
    data: rides,
    meta,
  };
};

// View rider's ride history (Rider only)
const viewRideHistory = async (
  userId: string,
  query: Record<string, string>
) => {
  // Define searchable fields
  const searchFields = ["pickup", "destination", "status"];

  const queryBuilder = new QueryBuilder<IRide>(
    Ride.find({ userId: userId }),
    query
  );
  const rides = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build()
    .populate("userId", "name email phone")
    .lean<IRide[]>();

  // Get driver info
  const ridesData = await Promise.all(
    rides.map(async (ride) => {
      if (!ride.driverId) {
        return { ...ride, driverInfo: null };
      }

      const driverInfo = await Driver.findOne({ userId: ride.driverId })
        .select("-applicationStatus -completedRides -createdAt -updatedAt")
        .populate<{ userId: IDriverUser }>("userId", "name email phone")
        .lean();

      return { ...ride, driverInfo: driverInfo || null };
    })
  );

  // Get meta data for pagination
  const meta = await queryBuilder.meta();
  return {
    data: ridesData,
    meta,
  };
};

// Request a ride (Rider only)
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
    $push: { rides: new mongoose.Types.ObjectId(ride._id) },
  });
  return ride;
};

// Cancel a ride (Rider only)
const cancelRide = async (userId: string, rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (userId !== ride.userId.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to cancel this ride. You can only cancel your own rides."
    );
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

  // Update ride status to cancelled
  ride.status = RideStatus.CANCELLED;
  await ride.save();
  return ride;
};

// Accept a ride (Driver only)
const acceptRide = async (driverId: string, rideId: string) => {
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

  // check if driver already accepted a ride and assign driverId
  const existingRide = await Ride.findOne({
    driverId: driverId,
    status: {
      $in: [RideStatus.ACCEPTED, RideStatus.PICKED_UP, RideStatus.IN_TRANSIT],
    },
  });
  if (existingRide) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already accepted a ride. Please complete the current ride before accepting a new one."
    );
  }

  // Assign driver to the ride
  ride.driverId = new mongoose.Types.ObjectId(driverId);

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    acceptedAt: new Date(),
  };

  // Update ride status to acctepted
  ride.status = RideStatus.ACCEPTED;
  await ride.save();
  return ride;
};

// Reject a ride (Driver only)
const rejectRide = async (driverId: string, rideId: string) => {
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

  // check if driver already accepted a ride and assign driverId
  const existingRide = await Ride.findOne({
    driverId: driverId,
    status: {
      $in: [RideStatus.ACCEPTED, RideStatus.PICKED_UP, RideStatus.IN_TRANSIT],
    },
  });
  if (existingRide) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already accepted a ride. Please complete the current ride before rejecting a new one."
    );
  }

  // Merge existing timestamps info with the new one
  ride.timestamps = {
    ...(ride.timestamps as any).toObject(),
    rejectedAt: new Date(),
  };

  // Update ride status to rejected
  ride.status = RideStatus.REJECTED;
  await ride.save();
  return ride;
};

// Pick up a rider (Driver only)
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

  // Update ride status to picked up
  ride.status = RideStatus.PICKED_UP;
  await ride.save();
  return ride;
};

// Ride in transit (Driver only)
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

  // Update ride status to in transit
  ride.status = RideStatus.IN_TRANSIT;
  await ride.save();
  return ride;
};

// Complete a ride (Driver only)
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

  // Update ride status to completed and add ride reference to driver
  ride.status = RideStatus.COMPLETED;
  await ride.save();
  await Driver.findOneAndUpdate(
    { userId: ride.driverId },
    {
      $push: { completedRides: new mongoose.Types.ObjectId(ride._id) },
    }
  );
  await User.findByIdAndUpdate(ride.driverId, {
    $push: { rides: new mongoose.Types.ObjectId(ride._id) },
  });

  return ride;
};

// Ride service object
const rideService = {
  getAllRides,
  getSingleRide,
  activeRide,
  getAllRequestedRides,
  viewRideHistory,
  requestRide,
  cancelRide,
  acceptRide,
  rejectRide,
  pickUpRider,
  inTransitRide,
  completeRide,
};

export default rideService;
