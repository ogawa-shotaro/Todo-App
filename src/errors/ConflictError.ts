import { StatusCodes } from "http-status-codes";

export class ConflictError extends Error {
  statusCode: StatusCodes.CONFLICT;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}
