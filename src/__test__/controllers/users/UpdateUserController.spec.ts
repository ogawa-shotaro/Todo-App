import { StatusCodes } from "http-status-codes";

import { UpdateUserController } from "../../../controllers/users/UpdateUserController";
import { MockRepository } from "../../helper/mocks/MockUserRepository";
import { createMockAuthenticatedRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】ユーザー更新機能", () => {
  let repository: MockRepository;
  let controller: UpdateUserController;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new UpdateUserController(repository);
  });
  describe("【成功パターン】", () => {
    it("updateメソッドのパラメーターが【id:1とname:変更後のユーザー名】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        body: {
          name: "変更後のユーザー名",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        name: "変更後のユーザー名",
        email: "dummyData@mail.com",
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "変更後のユーザー名",
        email: "dummyData@mail.com",
      });
      expect(repository.update).toHaveBeenCalledWith({
        userId: 1,
        name: "変更後のユーザー名",
      });
    });
    it("updateメソッドのパラメーターが【id:1とpassword:updatedPassword】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        body: {
          password: "updatedPassword",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      });
      expect(repository.update).toHaveBeenCalledWith({
        userId: 1,
        password: "updatedPassword",
      });
    });
    it("updateメソッドのパラメーターが【id:1とemail:updatedEmail@mail.com】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        body: {
          email: "updatedEmail@mail.com",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        name: "ダミーユーザー",
        email: "updatedEmail@mail.com",
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "ダミーユーザー",
        email: "updatedEmail@mail.com",
      });
      expect(repository.update).toHaveBeenCalledWith({
        userId: 1,
        email: "updatedEmail@mail.com",
      });
    });
    it("updateメソッドのパラメーターが【全てのプロパティの更新値】で呼び出され、更新後のデータが返る。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        body: {
          name: "変更後のユーザー名",
          password: "updatedPassword",
          email: "updatedEmail@mail.com",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockResolvedValue({
        id: 1,
        name: "変更後のユーザー名",
        email: "updatedEmail@mail.com",
      });

      await controller.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "変更後のユーザー名",
        email: "updatedEmail@mail.com",
      });
      expect(repository.update).toHaveBeenCalledWith({
        userId: 1,
        name: "変更後のユーザー名",
        password: "updatedPassword",
        email: "updatedEmail@mail.com",
      });
    });
  });
  describe("【異常パターン】", () => {
    it("updateメソッドのパラメータが不正の場合、next関数(パラメーターがError)を実行する。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
        body: {
          name: "",
          password: "ExcessivePassword",
          email: "incorrectFormat.com",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.update.mockRejectedValue(new Error("dummy error"));

      await controller.update(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
