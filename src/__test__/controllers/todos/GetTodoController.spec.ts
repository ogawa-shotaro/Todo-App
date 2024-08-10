import { GetTodoController } from "../../../controllers/todos/GetTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件を取得", () => {
  const repository = new MockRepository();
  const todoGetController = new GetTodoController(repository);
  describe("【成功パターン】Todoデータ(jsonとstatus200)が返る", () => {
    it("findメソッドが1回実行されて、仮DB(argumentStack)から、id:1のTodoを取得する", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      await todoGetController.find(req, res);

      expect(repository.getCallCount()).toEqual(1);
      expect(repository.getArgumentStack(0)).toEqual({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("findメソッドが2回実行されて、仮DB(argumentStack)から、id:2のTodoを取得する", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      await todoGetController.find(req, res);

      expect(repository.getCallCount()).toEqual(2);
      expect(repository.getArgumentStack(1)).toEqual({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
  describe("異常パターン", () => {
    it("存在しないIDへのリクエストは、エラーメッセージとstatus404が返る", async () => {
      const req = createMockRequest({ id: "999" });
      const res = createMockResponse();

      await todoGetController.find(req, res);

      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Not found",
        stat: "fail",
      });
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
