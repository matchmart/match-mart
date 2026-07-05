import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db";
import User from "../models/User";
const run = async () => {
  await connectDB();
  const name = process.env.ADMIN_NAME || "Admin";
  const email = process.env.ADMIN_EMAIL || "admin@matchmart.lk";
  const password = process.env.ADMIN_PASSWORD || "Admin12345";
  const existing = await User.findOne({ email });
  if (existing) { existing.role = "admin"; await existing.save(); console.log("Admin already exists, role ensured."); process.exit(0); }
  await User.create({ name, email, password, role: "admin" });
  console.log(`Admin created: ${email}`);
  process.exit(0);
};
run().catch((err) => { console.error(err); process.exit(1); });
