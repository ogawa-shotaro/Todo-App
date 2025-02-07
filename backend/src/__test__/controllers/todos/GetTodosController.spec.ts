import { StatusCodes } from "http-status-codes";

import { GetTodosController } from "../../../controllers/todos/GetTodosController";
import { InvalidError } from "../../../errors/InvalidError";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import {
  createMockAuthenticatedRequest,
  createMockRequest,
} from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo一覧取得", () => {
  describe("DBにデータなし", () => {
    it("空配列とTodo総数の取得(jsonとstatus(ok=200)が返る)", async () => {
      const repository = new MockRepository();
      const controller = new GetTodosController(repository);

      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        query: {},
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.list.mockResolvedValue({ items: [], totalCount: 0 });

      await controller.list(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({ items: [], totalCount: 0 });
    });
  });
  describe("DBにデータあり", () => {
    it("Todo一覧とTodo総数の取得(jsonとstatus(ok=200)が返る)", async () => {
      const repository = new MockRepository();
      const controller = new GetTodosController(repository);

      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        query: {},
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.list.mockResolvedValue({
        items: [
          {
            id: 1,
            title: "ダミータイトル1",
            body: "ダミーボディ1",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            userId: 1,
          },
          {
            id: 2,
            title: "ダミータイトル2",
            body: "ダミーボディ2",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            userId: 1,
          },
          {
            id: 3,
            title: "ダミータイトル3",
            body: "ダミーボディ3",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            userId: 1,
          },
        ],
        totalCount: 3,
      });

      await controller.list(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        items: [
          {
            id: 1,
            title: "ダミータイトル1",
            body: "ダミーボディ1",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            userId: 1,
          },
          {
            id: 2,
            title: "ダミータイトル2",
            body: "ダミーボディ2",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            userId: 1,
          },
          {
            id: 3,
            title: "ダミータイトル3",
            body: "ダミーボディ3",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            userId: 1,
          },
        ],
        totalCount: 3,
      });
    });
  });
  describe("パラメーターの指定有り・無しの場合", () => {
    let controller: GetTodosController;
    let repository: MockRepository;
    it("listメソッドのパラメーターが【userId:1,page=undefined,count=undefined】で呼び出される", async () => {
      repository = new MockRepository();
      controller = new GetTodosController(repository);

      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        query: {},
      });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({
        userId: 1,
        page: undefined,
        count: undefined,
      });
    });
    it("listメソッドのパラメーターが【userId:1,page=2,count=5】で呼び出される", async () => {
      repository = new MockRepository();
      controller = new GetTodosController(repository);

      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        query: { page: 2, count: 5 },
      });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({
        userId: 1,
        page: 2,
        count: 5,
      });
    });
    it("listメソッドのパラメーターが【userId:1,page=2】で呼び出される", async () => {
      repository = new MockRepository();
      controller = new GetTodosController(repository);

      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        query: { page: 2 },
      });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({ userId: 1, page: 2 });
    });
    it("listメソッドのパラメーターが【userId:1,count=3】で呼び出される", async () => {
      repository = new MockRepository();
      controller = new GetTodosController(repository);

      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        query: { count: 3 },
      });
      const res = createMockResponse();
      const next = jest.fn();

      await controller.list(req, res, next);

      expect(repository.list).toHaveBeenCalledWith({ userId: 1, count: 3 });
    });
  });
  describe("【異常パターン】", () => {
    let controller: GetTodosController;
    let repository: MockRepository;
    it("パラメーターに指定した値が不正(page=整数の1以上でない値)の場合、next関数(パラメーターがInvalidError)を実行する。", async () => {
      repository = new MockRepository();
      controller = new GetTodosController(repository);

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
      repository = new MockRepository();
      controller = new GetTodosController(repository);

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
