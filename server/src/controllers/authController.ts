import type { Request, Response } from "express";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { generateToken } from "../utils/generateToken";
const sanitize = (user: any) => ({ _id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt });
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) { res.status(400); throw new Error("Name, email and password are required"); }
  if (await User.findOne({ email })) { res.status(400); throw new Error("Email already registered"); }
  const user = await User.create({ name, email, password, role: "user" });
  res.status(201).json({ success: true, token: generateToken(String(user._id)), user: sanitize(user) });
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) { res.status(401); throw new Error("Invalid email or password"); }
  res.json({ success: true, token: generateToken(String(user._id)), user: sanitize(user) });
});
export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || user.role !== "admin" || !(await user.matchPassword(password))) { res.status(401); throw new Error("Invalid admin credentials"); }
  res.json({ success: true, token: generateToken(String(user._id)), user: sanitize(user) });
});
export const getMe = asyncHandler(async (req: Request, res: Response) => res.json({ success: true, user: sanitize(req.user) }));
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id).select("+password");
  if (!user || !(await user.matchPassword(currentPassword))) { res.status(400); throw new Error("Current password is incorrect"); }
  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: "Password updated" });
});
