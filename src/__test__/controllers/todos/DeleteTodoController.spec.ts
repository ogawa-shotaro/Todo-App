import { DeleteTodoController } from "../../../controllers/todos/DeleteTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件の削除", () => {
  let controller: DeleteTodoController;
  let repository: MockRepository;
  describe("【成功パターン】削除したTodoデータ(jsonとstatus200)が返る", () => {
    beforeEach(async () => {
      repository = new MockRepository();
      controller = new DeleteTodoController(repository);
    });
    it("deleteメソッドが1回実行されて、削除したTodoデータが返る(id:1)", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      await controller.delete(req, res);

      expect(repository.getCallCount()).toEqual(1);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("deleteメソッドが1回実行されて、削除したTodoデータが返る(id:2)", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      await controller.delete(req, res);

      expect(repository.getCallCount()).toEqual(1);

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
      const req = createMockRequest({}, { id: "999" });
      const res = createMockResponse();

      await controller.delete(req, res);

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
