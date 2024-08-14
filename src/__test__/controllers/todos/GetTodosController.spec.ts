import { GetTodosController } from "../../../controllers/todos/GetTodosController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】 Todo一覧取得", () => {
  let controller: GetTodosController;
  let repository: MockRepository;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new GetTodosController(repository);
  });
  describe("DBにデータなし", () => {
    it("空配列が返る", async () => {
      const req = createMockRequest();
      const res = createMockResponse();

      await controller.list(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  describe("DBにデータあり", () => {
    it("Todo一覧の取得(jsonとstatus200が返る)、", async () => {
      for (let i = 1; i <= 3; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }
      const req = createMockRequest();
      const res = createMockResponse();

      await controller.list(req, res);

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
  describe("パラメーターを指定した場合", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 20; i++) {
        await repository.save({
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        });
      }
    });
    it("【page=2,count=5】listメソッドが1回実行され、page=2,count=5が返る", async () => {
      const req = createMockRequest({ page: 2, count: 5 });
      const res = createMockResponse();

      await controller.list(req, res);

      expect(repository.getCallCount("list")).toEqual(1);
      expect(repository.getArgumentAt("list", 0)).toEqual({
        page: 2,
        count: 5,
      });
    });
    it("【page=2】listメソッドが1回実行され、page=2,count=10(デフォルト値)が返る", async () => {
      const req = createMockRequest({ page: 2 });
      const res = createMockResponse();

      await controller.list(req, res);

      expect(repository.getCallCount("list")).toEqual(1);
      expect(repository.getArgumentAt("list", 0)).toEqual({
        page: 2,
        count: 10,
      });
    });
    it("【count:3】listメソッドが1回実行され、page=1(デフォルト値),count=3が返る", async () => {
      const req = createMockRequest({ count: 3 });
      const res = createMockResponse();

      await controller.list(req, res);

      expect(repository.getCallCount("list")).toEqual(1);
      expect(repository.getArgumentAt("list", 0)).toEqual({
        page: 1,
        count: 3,
      });
    });
  });
});
