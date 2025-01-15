import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Page not found`, 404);
  next(error);
};

export default notFound;
