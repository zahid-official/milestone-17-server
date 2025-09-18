import User from "../user/user.model";
import envVars from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { verifyJWT } from "../../utils/JWT";
import AppError from "../../errors/AppError";
import { recreateToken } from "../../utils/getTokens";
import { AccountStatus } from "../user/user.interface";

// Regenerate access token using refresh token
const regenerateAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "No refresh token provided, authorization denied"
    );
  }

  const verifiedRefreshToken = verifyJWT(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  // Check potential errors
  const user = await User.findOne({ email: verifiedRefreshToken.email });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist");
  }

  if (!user.isVerified) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "User is not verified. Please verify your email to proceed."
    );
  }

  if (
    user.accountStatus === AccountStatus.BLOCKED ||
    user.accountStatus === AccountStatus.INACTIVE
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `User is ${user.accountStatus}. Please contact support for more information.`
    );
  }

  if (user.isDeleted) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "User is deleted. Please contact support for more information."
    );
  }

  // Recrete JWT access token
  const accessToken = recreateToken(user);
  return { accessToken };
};

// Auth service object
const authService = {
  regenerateAccessToken,
};

export default authService;
