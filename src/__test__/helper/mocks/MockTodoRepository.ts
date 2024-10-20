import type { Todo } from "@prisma/client";

import type { ITodoRepository } from "../../../repositories/todos/ITodoRepository";
import type {
  TodoDeletionParams,
  TodoFindParams,
  TodoInput,
  TodoListParams,
  TodoModificationParams,
} from "../../../types/todos/TodoRequest.type";

export class MockRepository implements ITodoRepository {
  save = jest.fn<Promise<Todo>, [TodoInput]>();
  list = jest.fn<Promise<Todo[]>, [TodoListParams]>();
  find = jest.fn<Promise<Todo>, [TodoFindParams]>();
  update = jest.fn<Promise<Todo>, [TodoModificationParams]>();
  delete = jest.fn<Promise<Todo>, [TodoDeletionParams]>();
}
