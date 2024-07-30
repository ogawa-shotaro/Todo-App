import type { ITodoRepository } from "../../../../repositories/ITodoRepository";
import type { Todo } from "@prisma/client";
import type {
  TodoInput,
  TodoUpdatedInput,
} from "../../../../types/TodoRequest.type";

export class MockRepository implements ITodoRepository {
  private nextId: number;

  constructor() {
    this.nextId = 1;
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

    return savedTodo;
  }

  async list({
    page = 1,
    count = 10,
  }: {
    page: number;
    count: number;
  }): Promise<Todo[]> {
    throw new Error("Method not implemented.");
  }

  async find(id: number): Promise<Todo> {
    if (id !== 1) {
      throw new Error("存在しないIDを指定しました。");
    }

    const todoItem: Todo = {
      id: 1,
      title: "ダミータイトル",
      body: "ダミーボディ",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return todoItem;
  }

  async update({ id, title, body }: TodoUpdatedInput): Promise<Todo> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<Todo> {
    throw new Error("Method not implemented.");
  }
}
