/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setCookies } from "../../utils/cookies";
import AppError from "../../errors/AppError";
import getTokens from "../../utils/getTokens";
import passport from "passport";

// Credentials login
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (error: any, user: any, info: any) => {
      // Check for errors
      if (error) {
        return next(new AppError(httpStatus.UNAUTHORIZED, info.message));
      }

      // Check if user exists
      if (!user) {
        return next(new AppError(httpStatus.UNAUTHORIZED, info.message));
      }

      // Generate tokens
      const tokens = getTokens(user);

      // Set token in cookies
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

// Auth controller object
const authController = {
  credentialsLogin,
};

export default authController;
