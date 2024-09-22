import { StatusCodes } from "http-status-codes";

import { PrismaClient } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import { requestAPI } from "../../../helper/requestHelper";

const prisma = new PrismaClient();

describe("【APIテスト】 Todo1件新規作成", () => {
  describe("【成功パターン】", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 2; i++) {
        await prisma.user.create({
          data: {
            name: `ダミーユーザー${i}`,
            password: `dammyPassword${i}`,
            email: `dammyData${i}@mail.com`,
          },
        });
      }
    });
    it("title.bodyを送ったら成功する", async () => {
      const request = {
        title: "ダミータイトル",
        body: "ダミーボディ",
        user_id: 1,
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.OK,
      }).send(request);

      const responseDataResult = response.body;

      expect(responseDataResult).toEqual({
        id: responseDataResult.id,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: responseDataResult.createdAt,
        updatedAt: responseDataResult.updatedAt,
        user_id: responseDataResult.user_id,
      });

      expect(typeof Number(responseDataResult.id)).toEqual("number");

      const responseCreatedAtDateObj = new Date(responseDataResult.createdAt);
      const responseUpdatedAtDateObj = new Date(responseDataResult.updatedAt);

      expect(!isNaN(responseCreatedAtDateObj.getTime())).toEqual(true);
      expect(!isNaN(responseUpdatedAtDateObj.getTime())).toEqual(true);
    });
  });
  describe("【異常パターン】", () => {
    it("【titleプロパティの入力値がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { body: "ダミーボディ", user_id: 1 };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "titleの内容は必須です。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("【titleプロパティ有り・入力値(1文字以上)がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { title: "", body: "ダミーボディ", user_id: 1 };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "titleは1文字以上である必要があります。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("【bodyプロパティの入力値がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { title: "ダミータイトル", user_id: 1 };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "bodyの内容は必須です。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("【bodyプロパティ有り・入力値(1文字以上)がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const request = { title: "ダミータイトル", body: "", user_id: 1 };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(request);

      expect(response.body).toEqual({
        message: "bodyは1文字以上である必要があります。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る", async () => {
      jest.spyOn(TodoRepository.prototype, "save").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });
      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }).send({
        title: "ダミータイトル",
        body: "ダミーボディ",
        user_id: 1,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
