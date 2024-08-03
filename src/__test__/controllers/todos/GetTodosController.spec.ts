import { GetTodosController } from "../../../controllers/todos/GetTodosController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

const repository = new MockRepository();
const todosGetController = new GetTodosController(repository);

describe("【ユニットテスト】 Todo一覧取得", () => {
  describe("DBにデータなし", () => {
    it("空配列が返る", async () => {
      const req = createMockRequest();
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  describe("DBにデータあり", () => {
    it("Todo一覧を取得できる、", async () => {
      for (let i = 1; i <= 3; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }

      const req = createMockRequest();
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 1,
          title: "ダミータイトル1",
          body: "ダミーボディ1",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: 2,
          title: "ダミータイトル2",
          body: "ダミーボディ2",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: 3,
          title: "ダミータイトル3",
          body: "ダミーボディ3",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });
  });
});
