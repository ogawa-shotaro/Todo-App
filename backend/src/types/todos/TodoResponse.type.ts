import type { Todo } from "@prisma/client";

import type { InvalidError } from "../../errors/InvalidError";
import type { NotFoundError } from "../../errors/NotFoundError";

export interface TodoListResponse {
  todos: Todo[];
  totalCount: number;
}

export type ResponseErrorType = InvalidError | NotFoundError | Error;
