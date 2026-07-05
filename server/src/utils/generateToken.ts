import jwt from "jsonwebtoken";
export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing");
  return jwt.sign({ id }, secret, { expiresIn: process.env.JWT_EXPIRE || "7d" } as jwt.SignOptions);
};
