import type { ITodoRepository } from "../../../repositories/ITodoRepository";
import type { Todo } from "@prisma/client";
import type {
  TodoInput,
  TodoUpdatedInput,
} from "../../../types/TodoRequest.type";

const DEFAULT_PAGE = 1;
const DEFAULT_COUNT = 10;

export class MockRepository implements ITodoRepository {
  private nextId: number;
  private todos: Todo[] = [];

  constructor() {
    this.nextId = 1;
    this.todos = [];
  }

  async save(inputData: TodoInput): Promise<Todo> {
    if (!inputData.title) {
      throw new Error("titleの内容は必須です");
    }

    if (!inputData.body) {
      throw new Error("bodyの内容は必須です");
    }

    const savedTodo: Todo = {
      id: this.nextId++,
      title: inputData.title,
      body: inputData.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(savedTodo);

    return savedTodo;
  }

  async list(
    { page = DEFAULT_PAGE, count = DEFAULT_COUNT } = {
      page: DEFAULT_PAGE,
      count: DEFAULT_COUNT,
    }
  ) {
    if (page < 1 || !Number.isInteger(page)) {
      throw new Error("pageは1以上の整数のみ");
    }
    if (count < 1 || !Number.isInteger(count)) {
      throw new Error("countは1以上の整数のみ");
    }

    const offset = (page - 1) * count;
    const todoItems = this.todos.slice(offset, count);

    return todoItems;
  }

  async find(id: number): Promise<Todo | null> {
    const todoItem = this.todos.find((todo) => todo.id === id);

    if (!todoItem) {
      throw new Error();
    }

    return todoItem;
  }

  async update({ id, title, body }: TodoUpdatedInput): Promise<Todo> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<Todo> {
    throw new Error("Method not implemented.");
  }
}
