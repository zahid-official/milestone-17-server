/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import authService from "./auth.service";
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import getTokens from "../../utils/getTokens";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { clearCookies, setCookies } from "../../utils/cookies";

// Regenerate access token
const regenerateAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await authService.regenerateAccessToken(refreshToken);

    // Set token in cookies
    setCookies(res, result);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Access token regenerated successfully",
      data: result,
    });
  }
);

// Credentials login
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (error: any, user: any, info: any) => {
      if (error) {
        return next(new AppError(httpStatus.UNAUTHORIZED, info.message));
      }

      if (!user) {
        return next(new AppError(httpStatus.UNAUTHORIZED, info.message));
      }

      // Generate tokens & set in cookies
      const tokens = getTokens(user);
      setCookies(res, tokens);

      // Convert to plain object & remove password before sending response
      const data = user.toObject();
      delete data?.password;

      // Send response
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Credentials login successful",
        data: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          data,
        },
      });
    })(req, res, next);
  }
);

// Logout user
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Clear cookies
    clearCookies(res);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged out successfully",
      data: null,
    });
  }
);


// Account verification via OTP
const otpVerification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    const result = await authService.otpVerification(name, email);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "OTP sent successfully",
      data: result,
    });
  }
);

// Auth controller object
const authController = {
  regenerateAccessToken,
  credentialsLogin,
  logout,
  otpVerification,
};

export default authController;
