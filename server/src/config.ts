import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET!;
export const MONGO_URL = process.env.MONGO_URL!;

if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env");
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env");
