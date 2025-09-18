import "dotenv/config";
import EnvConfig from "./env.interface";

const loadEnvs = (): EnvConfig => {
  // Check missing envs
  const requiredEnvs: string[] = [
    "DB_URL",
    "PORT",
    "NODE_ENV",

    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRESIN",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRESIN",

    "EXPRESS_SESSION_SECRET",
    "BCRYPT_SALT_ROUNDS",
    "FRONTEND_URL",

    "DEFAULT_ADMIN_EMAIL",
    "DEFAULT_ADMIN_PASSWORD",

    "RADIS_HOST",
    "RADIS_PORT",
    "RADIS_USERNAME",
    "RADIS_PASSWORD",

    "SMTP_PORT",
    "SMTP_HOST",
    "SMTP_FROM",
    "SMTP_USERNAME",
    "SMTP_PASSWORD",
  ];
  requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing the required enviroment variable : ${key}`);
    }
  });

  // Return validated envs
  return {
    DB_URL: process.env.DB_URL as string,
    PORT: Number(process.env.PORT) as number,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRESIN: process.env.JWT_ACCESS_EXPIRESIN as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRESIN: process.env.JWT_REFRESH_EXPIRESIN as string,

    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) as number,
    FRONTEND_URL: process.env.FRONTEND_URL as string,

    DEFAULT_ADMIN_EMAIL: process.env.DEFAULT_ADMIN_EMAIL as string,
    DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD as string,

    RADIS: {
      HOST: process.env.RADIS_HOST as string,
      PORT: Number(process.env.RADIS_PORT) as number,
      USERNAME: process.env.RADIS_USERNAME as string,
      PASSWORD: process.env.RADIS_PASSWORD as string,
    },

    SMTP: {
      HOST: process.env.SMTP_HOST as string,
      FROM: process.env.SMTP_FROM as string,
      PORT: Number(process.env.SMTP_PORT) as number,
      USERNAME: process.env.SMTP_USERNAME as string,
      PASSWORD: process.env.SMTP_PASSWORD as string,
    },
  };
};

const envVars = loadEnvs();
export default envVars;
