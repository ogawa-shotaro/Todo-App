import { StatusCodes } from "http-status-codes";

import { SessionUserController } from "../../../controllers/users/SessionUserController";
import { MockRepository } from "../../helper/mocks/MockUserRepository";
import {
  createMockAuthenticatedRequest,
  createMockRequest,
} from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】ユーザーログイン機能", () => {
  let repository: MockRepository;
  let controller: SessionUserController;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new SessionUserController(repository);
  });
  describe("【成功パターン】", () => {
    it("Loginメソッドのパラメータが正しいと、tokenとstatus(ok=200)が返る。", async () => {
      const req = createMockRequest({
        body: {
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      const mockUser = {
        id: 1,
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };
      const mockToken = "mockedJWT";

      repository.login.mockResolvedValue({ user: mockUser, token: mockToken });

      await controller.login(req, res, next);

      expect(repository.login).toHaveBeenCalledWith({
        password: "dummyPassword",
        email: "dummyData@mail.com",
      });
      expect(res.cookie).toHaveBeenCalledWith("token", "mockedJWT", {
        httpOnly: true,
        maxAge: 3600000,
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      });
    });
    it("reLoginメソッドのパラメータが正しいと、status(ok=200)が返る。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 1,
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      const mockUser = {
        id: 1,
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      repository.reLogin.mockResolvedValue(mockUser);

      await controller.reLogin(req, res, next);

      expect(repository.reLogin).toHaveBeenCalledWith({
        userId: 1,
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      });
    });
  });
  describe("【異常パターン】", () => {
    it("loginメソッドのパラメータが不正の場合、next関数(パラメーターがError)を実行する。", async () => {
      const req = createMockRequest({
        body: {
          password: "InvalidPassword",
          email: "InvalidEmail",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.login.mockRejectedValue(new Error("dummy error"));

      await controller.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
