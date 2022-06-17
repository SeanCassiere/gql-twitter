import { PrismaClient } from "@prisma/client";
import env from "./env";

const prisma = new PrismaClient({
	log: env.IS_PRODUCTION ? [] : ["query", "info", "warn", "error"],
});

export default prisma;
