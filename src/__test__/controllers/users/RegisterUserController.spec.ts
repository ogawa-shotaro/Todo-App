import { StatusCodes } from "http-status-codes";

import { RegisterUserController } from "../../../controllers/users/RegisterUserController";
import { InvalidError } from "../../../errors/InvalidError";
import { MockRepository } from "../../helper/mocks/MockUserRepository";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】ユーザーの新規登録", () => {
  let repository: MockRepository;
  let controller: RegisterUserController;
  beforeEach(async () => {
    repository = new MockRepository();
    controller = new RegisterUserController(repository);
  });
  describe("【成功パターン】", () => {
    it("Registerメソッドのパラメータが正しいと、User(jsonとstatus(ok=200))が返る", async () => {
      const req = createMockRequest({
        body: {
          name: "ダミーユーザー",
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
      repository.register.mockResolvedValue({
        user: mockUser,
        token: mockToken,
      });

      await controller.register(req, res, next);

      expect(repository.register).toHaveBeenCalledWith({
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        token: "mockedJWT",
        user: {
          id: 1,
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
      });
    });
  });
  describe("【異常パターン】", () => {
    it("Registerメソッドのパラメータが不正の場合、next関数(パラメーターがInvalidError)を実行する。", async () => {
      const req = createMockRequest({
        body: {
          name: "InvalidName",
          password: "InvalidPassword",
          email: "InvalidEmail",
        },
      });
      const res = createMockResponse();
      const next = jest.fn();

      repository.register.mockRejectedValue(
        new InvalidError("registerUserSchemaに基づくInvalidError"),
      );

      await controller.register(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
    });
  });
});
