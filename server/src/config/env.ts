import * as dotenv from "dotenv";
import path from "path";

// Use a relative path for local development, but default behavior in production
const envPath = process.env.NODE_ENV === "production" ? undefined : path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  APOLLO_PLAYGROUND: process.env.APOLLO_PLAYGROUND === "true",
};
