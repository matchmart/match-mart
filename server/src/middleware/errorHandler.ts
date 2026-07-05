import type { NextFunction, Request, Response } from "express";
export const errorHandler = (err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message || "Server Error" });
};
