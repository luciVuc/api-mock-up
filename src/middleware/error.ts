import { Response, Request, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req?: Request,
  res?: Response,
  next?: NextFunction
) => {
  if (!res) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  } else {
    res.status(res.statusCode || 500);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};
export default errorHandler;
