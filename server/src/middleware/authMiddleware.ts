import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import User from "../models/User";
interface JwtPayload { id: string; }
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) token = auth.split(" ")[1];
  if (!token) { res.status(401); return next(new Error("Not authorized, no token")); }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
    const user = await User.findById(decoded.id).select("-password");
    if (!user) { res.status(401); return next(new Error("Not authorized")); }
    req.user = user;
    next();
  } catch { res.status(401); next(new Error("Not authorized, token failed")); }
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === "admin") return next();
  res.status(403); next(new Error("Admin access required"));
};
