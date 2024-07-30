import { GetTodoController } from "../../../../controllers/todos/GetTodoController";
import { MockRepository } from "../../../helper/mocks/MockRepository/MockTodoRepository";
import { createMockGetTodoRequest } from "../../../helper/mocks/MockRequests/CreateMockGetTodoRequest";
import { createMockResponse } from "../../../helper/mocks/MockResponse/CreateMockResponse";

describe("【ユニットテスト】Todo1件を取得", () => {
  describe("成功パターン", () => {
    it("Todo(json)とstatus 200が返る", async () => {
      const repository = new MockRepository();
      const todoGetController = new GetTodoController(repository);

      const req = createMockGetTodoRequest({ id: "1" });
      const res = createMockResponse();

      await todoGetController.find(req, res);

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
    it("存在しないIDへのリクエストは、エラーメッセージとstatus404が返る", async () => {
      const repository = new MockRepository();
      const todoCreateController = new GetTodoController(repository);

      const req = createMockGetTodoRequest({ id: "999" });
      const res = createMockResponse();

      await todoCreateController.find(req, res);

      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Not found",
        stat: "fail",
      });
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
