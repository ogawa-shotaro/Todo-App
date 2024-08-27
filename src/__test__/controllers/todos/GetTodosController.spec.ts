import { StatusCodes } from "http-status-codes";

import { GetTodosController } from "../../../controllers/todos/GetTodosController";
import { InvalidError } from "../../../errors/InvalidError";
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
    it("空配列が返る(jsonとstatus(ok=200)が返る)", async () => {
      const req = createMockRequest({ query: {} });
      const res = createMockResponse();
      const next = jest.fn();

      repository.list.mockResolvedValue([]);

      await controller.list(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  describe("DBにデータあり", () => {
    it("Todo一覧の取得(jsonとstatus(ok=200)が返る)", async () => {
      const req = createMockRequest({ query: {} });
      const res = createMockResponse();
      const next = jest.fn();

      repository.list.mockResolvedValue([
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

      await controller.list(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
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
  describe("パラメーターの指定有り・無しの場合", () => {
    it("listメソッドのパラメーターが【page=undefined,count=undefined】で呼び出される", async () => {
      const req = createMockRequest({ query: {} });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({
        page: undefined,
        count: undefined,
      });
    });
    it("listメソッドのパラメーターが【page=2,count=5】で呼び出される", async () => {
      const req = createMockRequest({ query: { page: 2, count: 5 } });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({
        page: 2,
        count: 5,
      });
    });
    it("listメソッドのパラメーターが【page=2】で呼び出される", async () => {
      const req = createMockRequest({ query: { page: 2 } });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({ page: 2 });
    });
    it("listメソッドのパラメーターが【count=3】で呼び出される", async () => {
      const req = createMockRequest({ query: { count: 3 } });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({ count: 3 });
    });
  });
  describe("【異常パターン】", () => {
    it("パラメーターに指定した値が不正(page=整数の1以上でない値)の場合、next関数(パラメーターがInvalidError)を実行する。", async () => {
      const req = createMockRequest({ query: { page: 0 } });
      const res = createMockResponse();
      const next = jest.fn();

      repository.list.mockRejectedValue(
        new InvalidError("pageは1以上の整数のみ"),
      );

      await controller.list(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
    });
    it("パラメーターに指定した値が不正(count=整数の1以上でない値)の場合、next関数(パラメーターがInvalidError)を実行する。", async () => {
      const req = createMockRequest({ query: { count: 0 } });
      const res = createMockResponse();
      const next = jest.fn();

      repository.list.mockRejectedValue(
        new InvalidError("countは1以上の整数のみ"),
      );

      await controller.list(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
    });
  });
});
