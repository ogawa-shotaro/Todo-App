import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { InvalidError } from "../errors/InvalidError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { ResponseErrorType } from "../types/TodoResponse.typs";

export function errorHandler(
  err: ResponseErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    err instanceof InvalidError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError
  ) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}
