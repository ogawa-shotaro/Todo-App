import { StatusCodes } from "http-status-codes";

import { DeleteTodoController } from "../../../controllers/todos/DeleteTodoController";
import { InvalidError } from "../../../errors/InvalidError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件の削除", () => {
  let controller: DeleteTodoController;
  let repository: MockRepository;
  describe("【成功パターン】", () => {
    beforeEach(async () => {
      repository = new MockRepository();
      controller = new DeleteTodoController(repository);
    });
    it("deleteメソッドのパラメーターが【id:1】で呼び出され、削除したTodoデータ(jsonとstatus(ok=200))が返る。", async () => {
      const req = createMockRequest({ params: { id: "1" } });
      const res = createMockResponse();
      const next = jest.fn();

      repository.delete.mockResolvedValue({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
    it("deleteメソッドのパラメーターが【id:2】で呼び出され、削除したTodoデータ(jsonとstatus(ok=200))が返る。", async () => {
      const req = createMockRequest({ params: { id: "2" } });
      const res = createMockResponse();
      const next = jest.fn();

      repository.delete.mockResolvedValue({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "ダミータイトル2",
        body: "ダミーボディ2",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
  describe("【異常パターン】", () => {
    it("存在しないIDへのリクエスト時には、next関数(パラメーターがNotFoundError)を実行する。", async () => {
      const req = createMockRequest({ params: { id: "999" } });
      const res = createMockResponse();
      const next = jest.fn();

      repository.delete.mockRejectedValue(
        new NotFoundError("存在しないIDを指定しました。"),
      );

      await controller.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
    it("パラメーターに指定した値が不正(整数の1以上でない値)時には、next関数(パラメーターがInvalidError)を実行する。", async () => {
      const req = createMockRequest({ params: { id: "0" } });
      const res = createMockResponse();
      const next = jest.fn();

      repository.delete.mockRejectedValue(
        new InvalidError("IDは1以上の整数のみ。"),
      );

      await controller.delete(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
    });
  });
});
