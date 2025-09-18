import bcrypt from "bcryptjs";
import User from "./user.model";
import envVars from "../../config/env";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { IAuthProvider, IUser } from "./user.interface";

// Register new user
const registerUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload || {};

  // Check if user already exists
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, `User '${email}' already exists`);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password as string,
    envVars.BCRYPT_SALT_ROUNDS
  );

  // Authentication provider
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string, // Using email as providerId for credentials
  };

  // Create new user
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

// User service object
const userService = {
  registerUser,
};

export default userService;
