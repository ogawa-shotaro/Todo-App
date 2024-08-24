import type { InvalidError } from "../errors/InvalidError";
import type { NotFoundError } from "../errors/NotFoundError";

export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoUpdatedInput extends TodoInput {
  id: number;
}

export interface TodoListParams {
  page: number;
  count: number;
}

export type TypeErrors = InvalidError | NotFoundError | Error;
