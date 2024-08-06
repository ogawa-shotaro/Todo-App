import { UpdateTodoController } from "../../../controllers/todos/UpdateTodoController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

const repository = new MockRepository();
const todoUpdateController = new UpdateTodoController(repository);

describe("【ユニットテスト】 Todo一件の更新", () => {
  describe("成功パターン", () => {
    beforeAll(async () => {
      for (let i = 1; i <= 2; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }
    });
    it("id:1のデータ更新(タイトルのみ)", async () => {
      const req = createMockRequest({ title: "変更後のタイトル" }, { id: "1" });
      const res = createMockResponse();

      await todoUpdateController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のタイトル",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("id:1のデータ更新(ボディのみ)", async () => {
      const req = createMockRequest({ body: "変更後のボディ" }, { id: "1" });
      const res = createMockResponse();

      await todoUpdateController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: new Date(),
      });
    });
    it("id:2のデータ更新(タイトルとボディ)", async () => {
      const req = createMockRequest(
        { title: "変更後のタイトル", body: "変更後のボディ" },
        { id: "2" }
      );
      const res = createMockResponse();

      await todoUpdateController.update(req, res);

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

        await todoUpdateController.update(req, res);

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
