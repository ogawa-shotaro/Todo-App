import type { Request, Response } from "express";
import type { IRepository } from "../../../../repositories/IRepository";
import type { Todo } from "@prisma/client";
import { CreateTodoController } from "../../../../controllers/todos/CreateTodoController";
import {
  TodoInput,
  TodoUpdatedInput,
} from "../../../../types/TodoRequest.type";

class MockRepository implements IRepository {
  private nextId: number;

  constructor() {
    this.nextId = 1;
  }

  async save(inputData: TodoInput): Promise<Todo> {
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

  async find(id: number): Promise<Todo | null> {
    throw new Error("Method not implemented.");
  }

  async update({ id, title, body }: TodoUpdatedInput): Promise<Todo> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<Todo> {
    throw new Error("Method not implemented.");
  }
}

describe("【ユニットテスト】Todo1件新規作成", () => {
  describe("成功パターン", () => {
    it("id付きのTodoEntityを返す", async () => {
      const repository = new MockRepository();
      const todoCreateController = new CreateTodoController(repository);

      todoCreateController.create();
    });
  });
});
