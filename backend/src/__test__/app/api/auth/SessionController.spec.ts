import { StatusCodes } from "http-status-codes";

import { type User } from "@prisma/client";

import { UserRepository } from "../../../../repositories/users/UserRepository";
import {
  createTestUser,
  requestAPI,
  requestAPIWithAuth,
} from "../../../helper/requestHelper";

describe("【APIテスト】認証・認可機能（トークン管理含む）", () => {
  let newUser: User;
  beforeEach(async () => {
    newUser = await createTestUser();
  });
  describe("【成功パターン】", () => {
    it("リクエストに成功すると、ユーザー情報を返してcookieにJWTをセットする。", async () => {
      const request = {
        password: "dummyPassword",
        email: newUser.email,
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/auth/login",
        statusCode: StatusCodes.OK,
      }).send(request);

      const responseUser = response.body;
      const cookie = response.header["set-cookie"];

      expect(responseUser).toEqual({
        id: 1,
        name: "ダミーユーザー",
        email: newUser.email,
      });
      expect(cookie[0]).toContain("token=");
    });
    it("認証済みユーザーでJWTの有効期限内なら、ユーザー情報を返してJWTを再セットする。", async () => {
      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/auth/refresh",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send();

      const responseUser = response.body;
      const cookie = response.header["set-cookie"];

      expect(responseUser).toEqual({
        id: 1,
        name: "ダミーユーザー",
        email: newUser.email,
      });
      expect(cookie[0]).toContain("token=");
    });
    it("リクエスト(ログアウト)を送った場合、トークンが無効化される。", async () => {
      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/auth/logout",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const cookie = response.header["set-cookie"];

      expect(cookie[0]).toContain("token=;");
      expect(cookie[0]).toContain("Expires=");
    });
  });
  describe("【異常パターン】", () => {
    describe("【loginUserSchemaに基づくInvalidErrorのテスト】", () => {
      it("passwordプロパティの入力値がない場合。", async () => {
        const request = {
          email: newUser.email,
        };

        const response = await requestAPI({
          method: "post",
          endPoint: "/api/auth/login",
          statusCode: StatusCodes.BAD_REQUEST,
        }).send(request);

        expect(response.body).toEqual({
          message: "パスワードの入力は必須です。",
        });
      });
      it("passwordプロパティ有り・入力値が不正(7文字以下)な場合。", async () => {
        const request = {
          password: "Invalid",
          email: newUser.email,
        };

        const response = await requestAPI({
          method: "post",
          endPoint: "/api/auth/login",
          statusCode: StatusCodes.BAD_REQUEST,
        }).send(request);

        expect(response.body).toEqual({
          message: "パスワードは8文字以上である必要があります。",
        });
      });
      it("passwordプロパティ有り・入力値が不正(16文字より多い場合)な場合。", async () => {
        const request = {
          password: "ExcessivePassword",
          email: newUser.email,
        };

        const response = await requestAPI({
          method: "post",
          endPoint: "/api/auth/login",
          statusCode: StatusCodes.BAD_REQUEST,
        }).send(request);

        expect(response.body).toEqual({
          message: "パスワードは16文字以下である必要があります。",
        });
      });
      it("emailプロパティの入力値がない場合。", async () => {
        const request = {
          password: "dummyPassword",
        };

        const response = await requestAPI({
          method: "post",
          endPoint: "/api/auth/login",
          statusCode: StatusCodes.BAD_REQUEST,
        }).send(request);

        expect(response.body).toEqual({
          message: "emailの入力は必須です。",
        });
      });
      it("emailプロパティ有り・入力値が不正(形式が正しくない)な場合。", async () => {
        const request = {
          password: "dummyPassword",
          email: "incorrectFormat.com",
        };

        const response = await requestAPI({
          method: "post",
          endPoint: "/api/auth/login",
          statusCode: StatusCodes.BAD_REQUEST,
        }).send(request);

        expect(response.body).toEqual({
          message: "emailの形式が正しくありません。",
        });
      });
    });
    describe("【サーバーに関わるエラーテスト】", () => {
      it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージとstatus(InternalServerError=500)が返る。", async () => {
        jest.spyOn(UserRepository.prototype, "login").mockImplementation(() => {
          throw new Error("Unexpected Error");
        });

        const request = {
          password: "dummyPassword",
          email: newUser.email,
        };

        const response = await requestAPI({
          method: "post",
          endPoint: "/api/auth/login",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        }).send(request);

        expect(response.body).toEqual({ message: "Internal Server Error" });
      });
    });
  });
});
