import { GetTodoController } from "../../../controllers/todos/GetTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件を取得", () => {
  let controller: GetTodoController;
  let repository: MockRepository;
  describe("【成功パターン】Todoデータ(jsonとstatus200)が返る", () => {
    beforeEach(async () => {
      repository = new MockRepository();
      controller = new GetTodoController(repository);
    });
    it("findメソッドが1回実行され、仮DB(argumentStack)からID:1のTodoを取得する", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      await controller.find(req, res);

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
    it("findメソッドが2回実行され、仮DB(argumentStack)からID:2のTodoを取得する", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      await controller.find(req, res);

      expect(repository.getCallCount()).toEqual(1);
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

      await controller.find(req, res);

      expect(repository.getCallCount()).toEqual(1);

      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Not found",
        stat: "fail",
      });
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
