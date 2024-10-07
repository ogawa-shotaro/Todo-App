import type { Todo } from "@prisma/client";

import type {
  TodoDeletionParams,
  TodoFindParams,
  TodoInput,
  TodoListParams,
  TodoModificationParams,
} from "../types/TodoRequest.type";

export interface ITodoRepository {
  save(inputData: TodoInput): Promise<Todo>;
  list(inputData: TodoListParams): Promise<Todo[]>;
  find(inputData: TodoFindParams): Promise<Todo>;
  update(inputData: TodoModificationParams): Promise<Todo>;
  delete(inputData: TodoDeletionParams): Promise<Todo>;
}
