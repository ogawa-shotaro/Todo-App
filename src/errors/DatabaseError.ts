import { StatusCodes } from "http-status-codes";

export class DatabaseError extends Error {
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
