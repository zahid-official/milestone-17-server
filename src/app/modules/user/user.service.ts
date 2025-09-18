import bcrypt from "bcryptjs";
import User from "./user.model";
import envVars from "../../config/env";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../utils/queryBuilder";
import { IAuthProvider, IUser } from "./user.interface";

// Get all users
const getAllUsers = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["name", "email"];

  const queryBuilder = new QueryBuilder<IUser>(User.find(), query);
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
  getAllUsers,
  registerUser,
};

export default userService;
