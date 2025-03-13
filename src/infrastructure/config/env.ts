import * as dotenv from "dotenv";
dotenv.config();

export type ConfigType = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  ACCESS_SECRET: string;
  ACCESS_TIME: number; 
  REFRESH_SECRET: string;
  REFRESH_TIME: number;
  USER_EMAIL: string;
  APP_PASSWORD: string;
};


const REQUIRED_VARIABLES: (keyof ConfigType)[] = [
  "PORT",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "ACCESS_SECRET",
  "ACCESS_TIME",
  "REFRESH_SECRET",
  "REFRESH_TIME",
  "APP_PASSWORD",
  "USER_EMAIL",
];

const MISSING_VARIABLES = REQUIRED_VARIABLES.filter((variable) => {
  const value = process.env[variable];
  return !value || value.trim() === "";
});

if (MISSING_VARIABLES.length > 0) {
  console.error(
    `Kutub bo‘lmagan yoki bo‘sh muhit o‘zgaruvchilari: ${MISSING_VARIABLES.join(", ")}`,
  );
  process.exit(1);
}

export const config: ConfigType = {
  PORT: Number(process.env.PORT) || 3000,
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  ACCESS_SECRET: process.env.ACCESS_SECRET || "",
  ACCESS_TIME: Number(process.env.ACCESS_TIME) || 1800,
  REFRESH_SECRET: process.env.REFRESH_SECRET || "",
  REFRESH_TIME: Number(process.env.REFRESH_TIME) || 604800,
  USER_EMAIL: process.env.USER_EMAIL || "",
  APP_PASSWORD: process.env.APP_PASSWORD || "",
};
