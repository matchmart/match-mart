import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import authRoutes from "./routes/authRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import branchRoutes from "./routes/branchRoutes";

const app: Application = express();
const allowedOrigins = ["http://localhost:5173", "https://matchmart.netlify.app", process.env.CLIENT_URL].filter(Boolean) as string[];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
