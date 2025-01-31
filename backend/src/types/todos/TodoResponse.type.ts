import type { InvalidError } from "../../errors/InvalidError";
import type { NotFoundError } from "../../errors/NotFoundError";

export type PageResult<T> = {
  todos: T[];
  totalCount: number;
};

export type ResponseErrorType = InvalidError | NotFoundError | Error;
