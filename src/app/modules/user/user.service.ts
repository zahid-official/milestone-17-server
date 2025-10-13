import bcrypt from "bcryptjs";
import User from "./user.model";
import envVars from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../utils/queryBuilder";
import { AccountStatus, IAuthProvider, IUser, Role } from "./user.interface";

// Get all users
const getAllUsers = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["name", "email"];

  const queryBuilder = new QueryBuilder<IUser>(
    User.find().select("-password").lean(),
    query
  );
  const users = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build();

  // Get meta data for pagination
  const meta = await queryBuilder.meta();

  return {
    data: users,
    meta,
  };
};

// Get single user
const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return user;
};

// Get profile info
const getProfileInfo = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

// Register new user
const registerUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload || {};

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, `User '${email}' already exists`);
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    envVars.BCRYPT_SALT_ROUNDS
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string, // Using email as providerId for credentials
  };

  // If vehicleInfo is provided, set role to DRIVER
  if (rest?.vehicleInfo) {
    rest.role = Role.DRIVER;
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  // Convert to plain object & remove password before sending response
  const data = user.toObject();
  delete data?.password;

  return data;
};

// Update user details
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (
    (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) &&
    userId !== decodedToken.userId
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only update your own profile"
    );
  }

  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Prevent modification of admin account by non-super admin users
  if (isUserExists?.role === Role.ADMIN && decodedToken.role !== Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You don't have permission to modify admin account"
    );
  }

  if (
    payload?.role &&
    (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER)
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You don't have permission to change role. Only admin can change role"
    );
  }

  // Prevent status modification by non-admin users
  if (
    (payload?.accountStatus || payload?.isDeleted || payload?.isVerified) &&
    (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER)
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You don't have permission to change account status, delete status or verfication status."
    );
  }

  const user = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  // Convert to plain object & remove password before sending response
  const data = user?.toObject();
  delete data?.password;

  return data;
};

// Block user
const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // If user is already blocked, no need to block again
  if (user.accountStatus === AccountStatus.BLOCKED) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is already blocked");
  }

  user.accountStatus = AccountStatus.BLOCKED;
  await user.save();
  return null;
};

// Unblock user
const unblockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // If user is already unblocked, no need to unblock again
  if (user.accountStatus === AccountStatus.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is already active");
  }

  user.accountStatus = AccountStatus.ACTIVE;
  await user.save();
  return null;
};

// User service object
const userService = {
  getAllUsers,
  getSingleUser,
  getProfileInfo,
  registerUser,
  updateUser,
  blockUser,
  unblockUser,
};

export default userService;
