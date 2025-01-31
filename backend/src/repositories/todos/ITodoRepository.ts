import type { Todo } from "@prisma/client";

import type {
  TodoDeletionParams,
  TodoFindParams,
  TodoInput,
  TodoListParams,
  TodoModificationParams,
} from "../../types/todos/TodoRequest.type";
import type { PageResult } from "../../types/todos/TodoResponse.type";

export interface ITodoRepository {
  save(inputData: TodoInput): Promise<Todo>;
  list(inputData: TodoListParams): Promise<PageResult<Todo>>;
  find(inputData: TodoFindParams): Promise<Todo>;
  update(inputData: TodoModificationParams): Promise<Todo>;
  delete(inputData: TodoDeletionParams): Promise<Todo>;
}
