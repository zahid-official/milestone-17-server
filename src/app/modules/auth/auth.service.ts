import User from "../user/user.model";
import envVars from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { verifyJWT } from "../../utils/JWT";
import AppError from "../../errors/AppError";
import { redisClient } from "../../config/redis";
import generateOtp from "../../utils/generateOtp";
import { sendEmail } from "../../utils/sendEmail";
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

// Account verification via OTP
const otpVerification = async (name: string, email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already verified. Please login"
    );
  }

  // Store otp in redis with expiry time of 2 minutes
  const otp = generateOtp(6);
  const redisKey = `otp:${email}`;
  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: 60 * 2,
    },
  });

  // Send otp to email
  await sendEmail({
    to: email,
    subject: "OTP code for account verification",
    templateName: "sendOtp",
    templateData: {
      name: name,
      otpCode: otp,
      companyName: "Velocia",
      expiryTime: "2 minutes",
    },
  });

  return null;
};

// Auth service object
const authService = {
  regenerateAccessToken,
  otpVerification,
};

export default authService;
