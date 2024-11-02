import { StatusCodes } from "http-status-codes";

import { User } from "@prisma/client";

import { UserRepository } from "../../../../repositories/users/UserRepository";
import { requestAPI, requestAPIWithAuth } from "../../../helper/requestHelper";
import { createTestUser } from "../../../helper/requestHelper";

describe("【APIテスト】 ユーザーの更新機能", () => {
  let newUser: User;
  beforeEach(async () => {
    newUser = await createTestUser();
  });
  describe("【成功パターン】", () => {
    it("【nameプロパティの更新値】を送ったら成功する。", async () => {
      const request = {
        name: "変更後のユーザー名",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/users",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      expect(response.body).toEqual({
        id: newUser.id,
        name: "変更後のユーザー名",
        email: newUser.email,
      });
    });
    it("【passwordプロパティの更新値】を送ったら成功する。", async () => {
      const request = {
        password: "updatedPassword",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/users",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      expect(response.body).toEqual({
        id: newUser.id,
        name: "ダミーユーザー",
        email: newUser.email,
      });
    });
    it("【emailプロパティの更新値】を送ったら成功する。", async () => {
      const request = {
        email: "updatedEmail@mail.com",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/users",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      expect(response.body).toEqual({
        id: newUser.id,
        name: "ダミーユーザー",
        email: "updatedEmail@mail.com",
      });
    });
    it("【全てのプロパティの更新値】を送ったら成功する。", async () => {
      const request = {
        name: "変更後のユーザー名",
        password: "updatedPassword",
        email: "updatedEmail@mail.com",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/users",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      expect(response.body).toEqual({
        id: newUser.id,
        name: "変更後のユーザー名",
        email: "updatedEmail@mail.com",
      });
    });
  });
  describe("【異常パターン】", () => {
    describe("【updateUserSchemaに基づくInvalidErrorのテスト】", () => {
      it("nameプロパティの入力値(1文字以上)がない場合。", async () => {
        const request = {
          name: "",
        };

        const response = await requestAPIWithAuth({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.BAD_REQUEST,
          userId: newUser.id,
        }).send(request);

        expect(response.body).toEqual({
          message: "ユーザー名は1文字以上である必要があります。",
        });
      });
      it("passwordプロパティの入力値が不正(7文字以下)な場合。", async () => {
        const request = {
          password: "Invalid",
        };

        const response = await requestAPIWithAuth({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.BAD_REQUEST,
          userId: newUser.id,
        }).send(request);

        expect(response.body).toEqual({
          message: "パスワードは8文字以上である必要があります。",
        });
      });
      it("passwordプロパティの入力値が不正(16文字より多い場合)な場合。", async () => {
        const request = {
          password: "ExcessivePassword",
        };

        const response = await requestAPIWithAuth({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.BAD_REQUEST,
          userId: newUser.id,
        }).send(request);

        expect(response.body).toEqual({
          message: "パスワードは16文字以下である必要があります。",
        });
      });
      it("emailプロパティの入力値が不正(形式が正しくない)な場合。", async () => {
        const request = {
          email: "incorrectFormat.com",
        };

        const response = await requestAPIWithAuth({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.BAD_REQUEST,
          userId: newUser.id,
        }).send(request);

        expect(response.body).toEqual({
          message: "emailの形式が正しくありません。",
        });
      });
    });
    describe("【認証に関わるエラーテスト】", () => {
      it("【認証ユーザーでない場合】エラーメッセージとstatus(UNAUTHORIZED=401)が返る。", async () => {
        const request = {
          name: "変更後のユーザー名",
          password: "updatedPassword",
          email: "updatedEmail@mail.com",
        };

        const response = await requestAPI({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.UNAUTHORIZED,
        }).send(request);

        expect(response.body).toEqual({
          message: "認証に失敗しました。",
        });
      });
    });
    describe("【DBに関わるエラーテスト】", () => {
      it("【ConflictErrorのテスト】email値が重複している場合。", async () => {
        const secondUser = await createTestUser();

        const response = await requestAPIWithAuth({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.CONFLICT,
          userId: secondUser.id,
        }).send({ email: newUser.email });

        expect(response.body).toEqual({
          message: "emailの内容が重複しています。",
        });
      });
    });
    describe("【サーバーに関わるエラーテスト】", () => {
      it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージとstatus(InternalServerError=500)が返る。", async () => {
        jest
          .spyOn(UserRepository.prototype, "update")
          .mockImplementation(() => {
            throw new Error("Unexpected Error");
          });

        const request = {
          name: "変更後のユーザー名",
          password: "updatedPassword",
          email: "updatedEmail@mail.com",
        };

        const response = await requestAPIWithAuth({
          method: "put",
          endPoint: "/api/users",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          userId: newUser.id,
        }).send(request);

        expect(response.body).toEqual({ message: "Internal Server Error" });
      });
    });
  });
});
