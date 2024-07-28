import { CreateTodoController } from "../../../../controllers/todos/CreateTodoController";
import type { Request, Response } from "express";
import type { ITodoRepository } from "../../../../repositories/ITodoRepository";
import type { Todo } from "@prisma/client";
import type {
  TodoInput,
  TodoUpdatedInput,
} from "../../../../types/TodoRequest.type";

class MockRepository implements ITodoRepository {
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

const createMockRequest = (
  body: Partial<{ title: string; body: string }>
): Request => {
  return {
    body: {
      ...body,
    },
  } as Request;
};

const createMockResponse = (): Response => {
  const res: Response = {} as Response;

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as Response;
};

describe("【ユニットテスト】Todo1件新規作成", () => {
  describe("成功パターン", () => {
    it("Todo(json)とstatus 200が返る", async () => {
      const repository = new MockRepository();
      const todoCreateController = new CreateTodoController(repository);

      const req = createMockRequest({
        title: "ダミータイトル",
        body: "ダミーボディ",
      });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
  describe("異常パターン", () => {
    it("タイトルなしでは、エラーメッセージとstatus400が返る", async () => {
      const repository = new MockRepository();
      const todoCreateController = new CreateTodoController(repository);

      const req = createMockRequest({ title: "", body: "ダミーボディ" });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "titleの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("ボディなしでは、エラーメッセージとstatus400が返る", async () => {
      const repository = new MockRepository();
      const todoCreateController = new CreateTodoController(repository);

      const req = createMockRequest({ title: "ダミータイトル", body: "" });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "bodyの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
