import type { InvalidError } from "../errors/InvalidError";
import type { NotFoundError } from "../errors/NotFoundError";
import type { UnauthorizedError } from "../errors/UnauthorizedError";

export type ResponseErrorType =
  | InvalidError
  | NotFoundError
  | UnauthorizedError
  | Error;
