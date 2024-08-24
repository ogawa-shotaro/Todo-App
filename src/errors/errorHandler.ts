import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { InvalidError } from "./InvalidError";
import { NotFoundError } from "./NotFoundError";
import type { TypeErrors } from "../types/TodoRequest.type";

export function errorHandler(
  err: TypeErrors,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidError || err instanceof NotFoundError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}
