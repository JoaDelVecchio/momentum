import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    console.error(`AppError: ${error.message} (status: ${error.status})`);
    res.status(error.status).json({ error: error.message });
  } else if (error instanceof Error) {
    console.error(`Unexpected Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  } else {
    console.error("Unknown Error occurred.");
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export default errorHandler;
