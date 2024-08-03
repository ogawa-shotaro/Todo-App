import { GetTodoController } from "../../../controllers/todos/GetTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

const repository = new MockRepository();
const todoGetController = new GetTodoController(repository);

describe("【ユニットテスト】Todo1件を取得", () => {
  describe("成功パターン", () => {
    beforeAll(async () => {
      for (let i = 1; i <= 2; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }
    });
    it("id:1のTodoデータ(jsonとstatus200)が返る", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      await todoGetController.find(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("id:2のTodoデータ(jsonとstatus200)が返る", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      await todoGetController.find(req, res);

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
