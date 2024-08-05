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
    it("パラメーターの指定(page=2,count=5)をした場合、6件目のデータから10件のデータを取得する", async () => {
      for (let i = 4; i <= 20; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }

      const req = createMockRequest({ page: 2, count: 5 });
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 6 }),
          expect.objectContaining({ id: 7 }),
          expect.objectContaining({ id: 8 }),
          expect.objectContaining({ id: 9 }),
          expect.objectContaining({ id: 10 }),
        ])
      );
    });
    it("パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータを取得する", async () => {
      const req = createMockRequest({ page: 2 });
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 11 }),
          expect.objectContaining({ id: 12 }),
          expect.objectContaining({ id: 13 }),
          expect.objectContaining({ id: 14 }),
          expect.objectContaining({ id: 15 }),
          expect.objectContaining({ id: 16 }),
          expect.objectContaining({ id: 17 }),
          expect.objectContaining({ id: 18 }),
          expect.objectContaining({ id: 19 }),
          expect.objectContaining({ id: 20 }),
        ])
      );
    });
    it("パラメーターの指定(count=3)をした場合、先頭から3件のデータを取得する", async () => {
      const req = createMockRequest({ count: 3 });
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 1 }),
          expect.objectContaining({ id: 2 }),
          expect.objectContaining({ id: 3 }),
        ])
      );
    });
  });
});
