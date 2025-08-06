import { StatusCodes } from "http-status-codes";

import { DeleteUserController } from "../../../controllers/users/DeleteUserController";
import { MockRepository } from "../../helper/mocks/MockUserRepository";
import { createMockAuthenticatedRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】ユーザー削除機能", () => {
  let repository: MockRepository;
  let controller: DeleteUserController;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new DeleteUserController(repository);
  });
  describe("【成功パターン】", () => {
    it("deleteメソッドのパラメータが正しいと、ユーザー情報とstatus(ok=200)が返る。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.delete.mockResolvedValue({
        id: 1,
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      });

      await controller.delete(req, res, next);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      });
    });
  });
  describe("【異常パターン】", () => {
    it("deleteメソッドのパラメータが不正の場合、next関数(パラメーターがError)を実行する。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 999,
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.delete.mockRejectedValue(new Error("dummy error"));

      await controller.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
