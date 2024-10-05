import type { Todo } from "@prisma/client";

import type { TodoInput, TodoListParams } from "../types/TodoRequest.type";
import type { TodoUpdatedInput } from "../types/TodoRequest.type";
import type { TodoFindParams } from "../types/TodoRequest.type";

export interface ITodoRepository {
  save(inputData: TodoInput): Promise<Todo>;
  list(inputData: TodoListParams): Promise<Todo[]>;
  find(inputData: TodoFindParams): Promise<Todo>;
  update(inputData: TodoUpdatedInput): Promise<Todo>;
  delete(inputData: TodoFindParams): Promise<Todo>;
}
