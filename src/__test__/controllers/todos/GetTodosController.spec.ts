import { GetTodosController } from "../../../controllers/todos/GetTodosController";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】 Todo一覧取得", () => {
  const repository = new MockRepository();
  const todosGetController = new GetTodosController(repository);
  describe("【成功パターン】Todoデータ(jsonとstatus200)が返る", () => {
    it("Todo一覧を取得できる", async () => {
      const req = createMockRequest();
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(repository.getCallCount()).toEqual(1);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 1 }),
          expect.objectContaining({ id: 2 }),
          expect.objectContaining({ id: 3 }),
          expect.objectContaining({ id: 4 }),
          expect.objectContaining({ id: 5 }),
          expect.objectContaining({ id: 6 }),
          expect.objectContaining({ id: 7 }),
          expect.objectContaining({ id: 8 }),
          expect.objectContaining({ id: 9 }),
          expect.objectContaining({ id: 10 }),
        ])
      );
    });
    it("パラメーターの指定(page=2,count=5)をした場合、6件目のデータから10件のデータを取得する", async () => {
      const req = createMockRequest({ page: 2, count: 5 });
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(repository.getCallCount()).toEqual(2);
    });
    it("パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータを取得する", async () => {
      const req = createMockRequest({ page: 2 });
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(repository.getCallCount()).toEqual(3);
    });
    it("パラメーターの指定(count=3)をした場合、先頭から3件のデータを取得する", async () => {
      const req = createMockRequest({ count: 3 });
      const res = createMockResponse();

      await todosGetController.list(req, res);

      expect(repository.getCallCount()).toEqual(4);
    });
  });
});
