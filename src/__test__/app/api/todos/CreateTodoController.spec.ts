import { StatusCodes } from "http-status-codes";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import { requestAPIWithAuth } from "../../../helper/requestHelper";
import { createTestUser } from "../../../helper/requestHelper";

describe("【APIテスト】 Todo1件新規作成", () => {
  beforeAll(async () => {
    cookie = await createTestUser();
  });
  describe("【成功パターン】", () => {
    it("title.bodyを送ったら成功する", async () => {
      const request = {
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.OK,
        cookie,
      }).send(request);

      const result = response.body;

      expect(result).toEqual({
        id: result.id,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        userId: result.userId,
      });

      expect(typeof Number(result.id)).toEqual("number");

      const responseCreatedAtDateObj = new Date(result.createdAt);
      const responseUpdatedAtDateObj = new Date(result.updatedAt);

      expect(!isNaN(responseCreatedAtDateObj.getTime())).toEqual(true);
      expect(!isNaN(responseUpdatedAtDateObj.getTime())).toEqual(true);
    });
  });
  describe("【異常パターン】", () => {
    it("【titleプロパティの入力値がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { body: "ダミーボディ" };

      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
        cookie,
      }).send(request);

      expect(response.body).toEqual({
        message: "titleの内容は必須です。",
      });
    });
    it("【titleプロパティ有り・入力値(1文字以上)がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { title: "", body: "ダミーボディ" };

      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
        cookie,
      }).send(request);

      expect(response.body).toEqual({
        message: "titleは1文字以上である必要があります。",
      });
    });
    it("【bodyプロパティの入力値がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { title: "ダミータイトル" };

      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
        cookie,
      }).send(request);

      expect(response.body).toEqual({
        message: "bodyの内容は必須です。",
      });
    });
    it("【bodyプロパティ有り・入力値(1文字以上)がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { title: "ダミータイトル", body: "" };

      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
        cookie,
      }).send(request);

      expect(response.body).toEqual({
        message: "bodyは1文字以上である必要があります。",
      });
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る", async () => {
      jest.spyOn(TodoRepository.prototype, "save").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });
      const response = await requestAPIWithAuth({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        cookie,
      }).send({
        title: "ダミータイトル",
        body: "ダミーボディ",
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
    });
  });
});
