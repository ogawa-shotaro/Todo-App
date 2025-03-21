import { StatusCodes } from "http-status-codes";

import { SessionController } from "../../../controllers/auths/SessionController";
import { MockRepository } from "../../helper/mocks/MockUserRepository";
import {
  createMockAuthenticatedRequest,
  createMockRequest,
} from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】認証・認可機能（トークン管理含む）", () => {
  let repository: MockRepository;
  let controller: SessionController;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new SessionController(repository);
  });
  describe("【成功パターン】", () => {
    it("loginメソッドのパラメータが正しければ、ユーザー情報・トークン・ステータス(200=OK)を返す。", async () => {
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
    it("checkAndRefreshメソッドのパラメータが正しければ、ユーザー情報・トークン・ステータス(200=OK)を返す。", async () => {
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
      const mockToken = "mockedJWT";

      repository.checkAndRefresh.mockResolvedValue({
        user: mockUser,
        token: mockToken,
      });

      await controller.checkAndRefresh(req, res, next);

      expect(repository.checkAndRefresh).toHaveBeenCalledWith(1);

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
    it("logoutメソッドでは、cookieに保存されたトークンを削除し、ステータス(200=OK)を返す。", async () => {
      const res = createMockResponse();
      const next = jest.fn();

      await controller.logout(res, next);

      expect(res.clearCookie).toHaveBeenCalledWith("token", {
        httpOnly: true,
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
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
    it("checkAndRefreshメソッドのパラメータが不正の場合、next関数(パラメーターがError)を実行する。", async () => {
      const req = createMockAuthenticatedRequest({
        user: {
          id: 999,
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.checkAndRefresh.mockRejectedValue(new Error("dummy error"));

      await controller.checkAndRefresh(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
    it("logoutメソッドが失敗した場合、next関数(パラメーターがError)を実行する。", async () => {
      const res = createMockResponse();
      const next = jest.fn();

      res.clearCookie = jest.fn(() => {
        throw new Error("dummy error");
      });

      await controller.logout(res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
