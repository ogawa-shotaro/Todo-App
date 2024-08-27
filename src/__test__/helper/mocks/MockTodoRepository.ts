import type { Todo } from "@prisma/client";

import type { ITodoRepository } from "../../../repositories/ITodoRepository";
import type {
  TodoInput,
  TodoListParams,
  TodoUpdatedInput,
} from "../../../types/TodoRequest.type";

export class MockRepository implements ITodoRepository {
  save = jest.fn<Promise<Todo>, [TodoInput]>();
  list = jest.fn<Promise<Todo[]>, [TodoListParams]>();
  find = jest.fn<Promise<Todo>, [number]>();
  update = jest.fn<Promise<Todo>, [TodoUpdatedInput]>();
  delete = jest.fn<Promise<Todo>, [number]>();
}
