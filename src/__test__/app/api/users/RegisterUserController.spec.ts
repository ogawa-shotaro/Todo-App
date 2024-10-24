import { StatusCodes } from "http-status-codes";

import { UserRepository } from "../../../../repositories/users/UserRepository";
import { requestAPI } from "../../../helper/requestHelper";

describe("【APIテスト】 ユーザーの新規登録", () => {
  describe("【成功パターン】", () => {
    it("【name・password・email】を送ったら成功する", async () => {
      const request = {
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.OK,
      }).send(request);

      const responseUser = response.body;
      const cookie = response.header["set-cookie"];

      expect(responseUser).toEqual({
        id: 1,
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      });
      expect(cookie[0]).toContain("token=");
    });
  });
  describe("【異常パターン】", () => {
    it("【registerUserSchemaに基づくInvalidErrorのテスト】nameプロパティの入力値がない場合。", async () => {
      const request = {
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "ユーザー名の入力は必須です。",
      });
    });
    it("【registerUserSchemaに基づくInvalidErrorのテスト】nameプロパティ有り・入力値(1文字以上)がない場合。", async () => {
      const request = {
        name: "",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "ユーザー名は1文字以上である必要があります。",
      });
    });
    it("【registerUserSchemaに基づくInvalidErrorのテスト】passwordプロパティの入力値がない場合。", async () => {
      const request = {
        name: "ダミーユーザー",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "パスワードの入力は必須です。",
      });
    });
    it("【registerUserSchemaに基づくInvalidErrorのテスト】passwordプロパティ有り・入力値が不正(7文字以下)な場合。", async () => {
      const request = {
        name: "ダミーユーザー",
        password: "Invalid",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "パスワードは8文字以上である必要があります。",
      });
    });
    it("【registerUserSchemaに基づくInvalidErrorのテスト】passwordプロパティ有り・入力値が不正(16文字より多い場合)な場合。", async () => {
      const request = {
        name: "ダミーユーザー",
        password: "ExcessivePassword",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "パスワードは16文字以下である必要があります。",
      });
    });
    it("【registerUserSchemaに基づくInvalidErrorのテスト】emailプロパティの入力値がない場合。", async () => {
      const request = {
        name: "ダミーユーザー",
        password: "dummyPassword",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "emailの入力は必須です。",
      });
    });
    it("【registerUserSchemaに基づくInvalidErrorのテスト】emailプロパティ有り・入力値が不正(形式が正しくない)な場合。", async () => {
      const request = {
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "incorrectFormat.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "emailの形式が正しくありません。",
      });
    });
    it("【ConflictErrorのテスト】email値が重複している場合。", async () => {
      const request = {
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.OK,
      }).send(request);

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.CONFLICT,
      }).send(request);

      expect(response.body).toEqual({
        message: "emailの内容が重複しています。",
      });
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージとstatus(InternalServerError=500)が返る。", async () => {
      jest
        .spyOn(UserRepository.prototype, "register")
        .mockImplementation(() => {
          throw new Error("Unexpected Error");
        });

      const request = {
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos/register",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }).send(request);

      expect(response.body).toEqual({ message: "Internal Server Error" });
    });
  });
});
