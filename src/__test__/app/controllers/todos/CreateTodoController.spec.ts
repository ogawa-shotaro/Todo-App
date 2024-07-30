import { CreateTodoController } from "../../../../controllers/todos/CreateTodoController";
import { MockRepository } from "../../../helper/mocks/MockRepository/MockTodoRepository";
import { createMockTodoRequest } from "../../../helper/mocks/MockRequests/CreateMockTodoRequest";
import { createMockResponse } from "../../../helper/mocks/MockResponse/CreateMockResponse";

describe("【ユニットテスト】Todo1件新規作成", () => {
  describe("成功パターン", () => {
    it("Todo(json)とstatus 200が返る", async () => {
      const repository = new MockRepository();
      const todoCreateController = new CreateTodoController(repository);

      const req = createMockTodoRequest({
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

      const req = createMockTodoRequest({ title: "", body: "ダミーボディ" });
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

      const req = createMockTodoRequest({ title: "ダミータイトル", body: "" });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "bodyの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
