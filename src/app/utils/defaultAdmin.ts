/* eslint-disable no-console */

import envVars from "../config/env";
import User from "../modules/user/user.model";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import bcrypt from "bcryptjs";

const defaultAdmin = async () => {
  try {
    // Check if default admin already exists
    const isDefaultAdminExist = await User.findOne({
      email: envVars.DEFAULT_ADMIN_EMAIL,
    });
    if (isDefaultAdminExist) {
      return;
    }

    // Auth provider
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.DEFAULT_ADMIN_EMAIL,
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      envVars.DEFAULT_ADMIN_PASSWORD,
      envVars.BCRYPT_SALT_ROUNDS
    );

    // Default admin payload
    const defaultAdminData: IUser = {
      name: "Default Admin",
      email: envVars.DEFAULT_ADMIN_EMAIL,
      password: hashedPassword,
      role: Role.ADMIN,
      auths: [authProvider],
      isVerified: true,
    };

    await User.create(defaultAdminData);
    console.log("Default admin created successfully");
  } catch (error) {
    console.error(error);
  }
};

export default defaultAdmin;
