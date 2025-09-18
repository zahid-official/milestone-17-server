interface EnvConfig {
  DB_URL: string;
  PORT: number;
  NODE_ENV: "development" | "production";

  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRESIN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRESIN: string;

  EXPRESS_SESSION_SECRET: string;
  BCRYPT_SALT_ROUNDS: number;
  FRONTEND_URL: string;

  DEFAULT_ADMIN_EMAIL: string;
  DEFAULT_ADMIN_PASSWORD: string;
}

export default EnvConfig;
