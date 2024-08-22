import { StatusCodes } from "http-status-codes";

export class InvalidError extends Error {
  statusCode: StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
