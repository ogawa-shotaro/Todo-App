import { StatusCodes } from "http-status-codes";

import { UpdateTodoController } from "../../../controllers/todos/UpdateTodoController";
import { InvalidError } from "../../../errors/InvalidError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】 Todo一件の更新", () => {
  let controller: UpdateTodoController;
  let repository: MockRepository;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new UpdateTodoController(repository);
  });
  describe("【成功パターン】", () => {
    it("updateメソッドのパラメーターが【id:1・title:変更後のタイトル】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockRequest({
        params: { id: "1" },
        body: { title: "変更後のタイトル" },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        title: "変更後のタイトル",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のタイトル",
        body: "ダミーボディ1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(repository.update).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のタイトル",
      });
    });
    it("updateメソッドのパラメーターが【id:1、body:変更後のボディ】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockRequest({
        params: { id: "1" },
        body: { title: "変更後のボディ" },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        title: "ダミータイトル1",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル1",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(repository.update).toHaveBeenCalledWith({
        id: 1,
        title: "変更後のボディ",
      });
    });
    it("updateメソッドのパラメーターが【id:2、title:変更後のタイトル、body:変更後のボディ】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockRequest({
        params: { id: "2" },
        body: { title: "変更後のタイトル", body: "変更後のボディ" },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 2,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        title: "変更後のタイトル",
        body: "変更後のボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(repository.update).toHaveBeenCalledWith({
        id: 2,
        title: "変更後のタイトル",
        body: "変更後のボディ",
      });
    });
    describe("【異常パターン】", () => {
      it("【タイトルに不適切な値(文字列ではない値)が入力された場合】next関数(パラメーターがInvalidError)を実行する。", async () => {
        const req = createMockRequest({
          params: { id: "1" },
          body: { title: 111, body: "変更後のボディ" },
        });
        const res = createMockResponse();
        const next = jest.fn();

        repository.update.mockRejectedValue(
          new InvalidError("入力内容が不適切(文字列のみ)です。"),
        );

        await controller.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      });
      it("【ボディに不適切な値(文字列ではない値)が入力された場合】next関数(パラメーターがInvalidError)を実行する。", async () => {
        const req = createMockRequest({
          params: { id: "1" },
          body: { title: "変更後のタイトル", body: 222 },
        });
        const res = createMockResponse();
        const next = jest.fn();

        repository.update.mockRejectedValue(
          new InvalidError("入力内容が不適切(文字列のみ)です。"),
        );

        await controller.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      });
      it("【存在しないIDにリクエストした場合】next関数(パラメーターがNotFoundError)を実行する。", async () => {
        const req = createMockRequest({
          params: { id: "999" },
          body: { title: "変更後のタイトル", body: "変更後のボディ" },
        });
        const res = createMockResponse();
        const next = jest.fn();

        repository.update.mockRejectedValue(
          new NotFoundError("存在しないIDを指定しました。"),
        );

        await controller.update(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
      });
    });
  });
});
