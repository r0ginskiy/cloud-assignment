import { Request, Response, NextFunction } from "express";
import { logger } from "./logger.js";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
  });

  res.status(err.statusCode || 500).json({
    error: err.message || "Internal server error",
  });
};
