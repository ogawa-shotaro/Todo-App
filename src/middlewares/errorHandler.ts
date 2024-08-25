import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { InvalidError } from "../errors/InvalidError";
import { NotFoundError } from "../errors/NotFoundError";
import type { ResponseErrorType } from "../types/TodoResponse.typs";

export function errorHandler(
  err: ResponseErrorType,
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
