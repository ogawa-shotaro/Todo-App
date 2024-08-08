import { DeleteTodoController } from "../../../controllers/todos/DeleteTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件の削除", () => {
  let controller: DeleteTodoController;
  let repository: MockRepository;

  let dbOldData;
  let dbCurrentData;

  describe("成功パターン", () => {
    beforeEach(async () => {
      repository = new MockRepository();
      controller = new DeleteTodoController(repository);

      for (let i = 1; i <= 2; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }
    });
    it("仮DB(todos)から一件のTodoが削除され、削除したTodoデータ(id:1)が返る", async () => {
      const req = createMockRequest({}, { id: "1" });
      const res = createMockResponse();

      dbOldData = repository.list();
      await controller.delete(req, res);
      dbCurrentData = repository.list();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect((await dbOldData).length).toEqual(2);
      expect((await dbCurrentData).length).toEqual(1);
    });
    it("仮DB(todos)から一件のTodoが削除され、削除したTodoデータ(id:2)が返る", async () => {
      const req = createMockRequest({}, { id: "2" });
      const res = createMockResponse();

      dbOldData = repository.list();
      await controller.delete(req, res);
      dbCurrentData = repository.list();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect((await dbOldData).length).toEqual(2);
      expect((await dbCurrentData).length).toEqual(1);
    });
  });
  describe("異常パターン", () => {
    it("存在しないIDへのリクエストは、エラーメッセージとstatus404が返る", async () => {
      const req = createMockRequest({}, { id: "999" });
      const res = createMockResponse();

      await controller.delete(req, res);

      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Not found",
        stat: "fail",
      });
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
