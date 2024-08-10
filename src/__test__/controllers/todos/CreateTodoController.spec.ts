import { CreateTodoController } from "../../../controllers/todos/CreateTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件の新規作成", () => {
  const repository = new MockRepository();
  const todoCreateController = new CreateTodoController(repository);
  describe("【成功パターン】Todo(json)とstatus 200が返る", () => {
    it("saveメソッドが1回実行され、仮DB(argumentStack)から、1件のTodoデータが返る", async () => {
      const req = createMockRequest({
        title: "ダミータイトル",
        body: "ダミーボディ",
      });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(repository.getCallCount()).toEqual(1);
      expect(repository.getArgumentStack(0)).toEqual({
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

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
      const req = createMockRequest({
        title: "",
        body: "ダミーボディ",
      });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "titleの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("ボディなしでは、エラーメッセージとstatus400が返る", async () => {
      const req = createMockRequest({
        title: "ダミータイトル",
        body: "",
      });
      const res = createMockResponse();

      await todoCreateController.create(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "bodyの内容は必須です",
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
