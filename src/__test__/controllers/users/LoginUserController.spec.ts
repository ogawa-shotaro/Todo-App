import { StatusCodes } from "http-status-codes";

import { LoginUserController } from "../../../controllers/users/LoginUserController";
import { MockRepository } from "../../helper/mocks/MockUserRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】ユーザーログイン機能", () => {
  let repository: MockRepository;
  let controller: LoginUserController;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new LoginUserController(repository);
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
