import { config } from "dotenv";

config();

process.env.TZ = "UTC";

const env = {
	PORT: process.env.PORT ? parseInt(process.env.PORT) : 4000,
	NODE_ENV: process.env.NODE_ENV || "development",
	DATABASE_URL: process.env.DATABASE_URL || "",
	IS_PRODUCTION: process.env.NODE_ENV === "production",
	JWT_SECRET: process.env.JWT_SECRET || "change-me",
	COOKIE_SECRET: process.env.COOKIE_SECRET || "change-me",
	FRONTEND_HOSTS: process.env.FRONTEND_HOSTS
		? (JSON.parse(process.env.FRONTEND_HOSTS) as string[])
		: ["http://localhost:3000", "http://localhost:4000"],
	USE_APOLLO_PLAYGROUND: process.env.USE_APOLLO_PLAYGROUND === "true",
};

export default env;
