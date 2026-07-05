import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    if (process.env.SKIP_DB === "true") {
      console.log("⚠️ MongoDB connection skipped. Running backend in limited mode.");
    } else {
      await connectDB();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:");
    console.error(error);
    process.exit(1);
  }
};

startServer();