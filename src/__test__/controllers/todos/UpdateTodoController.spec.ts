import { UpdateTodoController } from "../../../controllers/todos/UpdateTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】 Todo一件の更新", () => {
  let controller: UpdateTodoController;
  let repository: MockRepository;
  describe("【成功パターン】更新されたTodoデータ(jsonとstatus200)が返る", () => {
    beforeEach(async () => {
      repository = new MockRepository();
      controller = new UpdateTodoController(repository);
    });
    it("updateメソッドが1回実行されて、更新されたTodoデータが返る(id:1タイトルのみ)", async () => {
      const req = createMockRequest({ title: "変更後のタイトル" }, { id: "1" });
      const res = createMockResponse();

      await controller.update(req, res);

      expect(repository.getCallCount()).toEqual(1);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のタイトル",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("updateメソッドが1回実行されて、更新されたTodoデータが返る(id:1のボディのみ)", async () => {
      const req = createMockRequest({ body: "変更後のボディ" }, { id: "1" });
      const res = createMockResponse();

      await controller.update(req, res);

      expect(repository.getCallCount()).toEqual(1);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("updateメソッドが1回実行されて、更新されたTodoデータが返る(id:2のタイトルとボディ) ", async () => {
      const req = createMockRequest(
        { title: "変更後のタイトル", body: "変更後のボディ" },
        { id: "2" }
      );
      const res = createMockResponse();

      await controller.update(req, res);

      expect(repository.getCallCount()).toEqual(1);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    describe("異常パターン", () => {
      it("存在しないIDへのリクエストは、エラーメッセージとstatus404が返る", async () => {
        const req = createMockRequest(
          { title: "dummyTitle", body: "dummyBody" },
          { id: "999" }
        );
        const res = createMockResponse();

        await controller.update(req, res);

        expect(res.json).toHaveBeenCalledWith({
          code: 404,
          message: "Not found",
          stat: "fail",
        });
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });
});
