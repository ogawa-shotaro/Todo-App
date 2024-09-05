import { StatusCodes } from "http-status-codes";

import { CreateTodoController } from "../../../controllers/todos/CreateTodoController";
import { InvalidError } from "../../../errors/InvalidError";
import { MockRepository } from "../../helper/mocks/MockTodoRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】Todo1件の新規作成", () => {
  let controller: CreateTodoController;
  let repository: MockRepository;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new CreateTodoController(repository);
  });
  describe("【成功パターン】", () => {
    it("saveメソッドのパラメータが正しい【titleとbodyの値を含む】と、Todo(jsonとstatus(ok=200))が返る", async () => {
      const req = createMockRequest({
        body: {
          title: "ダミータイトル",
          body: "ダミーボディ",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.save.mockResolvedValue({
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      await controller.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(repository.save).toHaveBeenCalledWith({
        title: "ダミータイトル",
        body: "ダミーボディ",
      });
    });
  });
  describe("【異常パターン】", () => {
    it("【タイトルが未入力の場合】next関数(パラメーターがInvalidError)を実行する。", async () => {
      const req = createMockRequest({
        body: {
          title: "",
          body: "ダミーボディ",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.save.mockRejectedValue(
        new InvalidError("titleの内容は必須です"),
      );

      await controller.create(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
    });
    it("【ボディが未入力の場合】next関数(パラメーターがInvalidError)を実行する。", async () => {
      const req = createMockRequest({
        body: {
          title: "ダミータイトル",
          body: "",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.save.mockRejectedValue(
        new InvalidError("bodyの内容は必須です"),
      );

      await controller.create(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
    });
  });
});
