import dotenv from "dotenv";
import { setServers } from "node:dns";
import mongoose from "mongoose";

dotenv.config();

// Your default DNS is refusing MongoDB SRV lookup.
// This forces Node/MongoDB to use Google + Cloudflare DNS.
setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in .env");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  });

  console.log("✅ MongoDB connected");
};

export { connectDB };
export default connectDB;