import type { Todo } from "@prisma/client";

import type {
  TodoDeletionParams,
  TodoInput,
  TodoListParams,
} from "../types/TodoRequest.type";
import type { TodoModificationParams } from "../types/TodoRequest.type";
import type { TodoFindParams } from "../types/TodoRequest.type";

export interface ITodoRepository {
  save(inputData: TodoInput): Promise<Todo>;
  list(inputData: TodoListParams): Promise<Todo[]>;
  find(inputData: TodoFindParams): Promise<Todo>;
  update(inputData: TodoModificationParams): Promise<Todo>;
  delete(inputData: TodoDeletionParams): Promise<Todo>;
}
