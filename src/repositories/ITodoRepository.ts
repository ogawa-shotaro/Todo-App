import type { Todo } from "@prisma/client";
import type { TodoInput } from "../types/TodoRequest.type";
import type { TodoUpdatedInput } from "../types/TodoRequest.type";

export interface ITodoRepository {
  save(inputData: TodoInput): Promise<Todo>;
  list({ page, count }: { page: number; count: number }): Promise<Todo[]>;
  find(id: number): Promise<Todo | null>;
  update({ id, title, body }: TodoUpdatedInput): Promise<Todo>;
  delete(id: number): Promise<Todo>;
}
