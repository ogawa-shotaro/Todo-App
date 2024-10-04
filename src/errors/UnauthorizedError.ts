import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends Error {
  statusCode: StatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
