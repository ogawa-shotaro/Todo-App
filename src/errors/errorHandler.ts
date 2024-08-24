import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { InvalidError } from "./InvalidError";
import { NotFoundError } from "./NotFoundError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error caught:");
  if (err instanceof InvalidError || err instanceof NotFoundError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}
