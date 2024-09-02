import { StatusCodes } from "http-status-codes";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import { requestAPI } from "../../../helper/requestHelper";

describe("【APIテスト】 Todo1件新規作成", () => {
  describe("【成功パターン】", () => {
    it("title.bodyを送ったら成功する", async () => {
      const requestData = {
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.OK,
      }).send(requestData);

      const responseDataResult = response.body;

      expect(responseDataResult).toEqual({
        id: responseDataResult.id,
        title: "ダミータイトル",
        body: "ダミーボディ",
        createdAt: responseDataResult.createdAt,
        updatedAt: responseDataResult.updatedAt,
      });

      expect(typeof Number(responseDataResult.id)).toEqual("number");

      const responseCreatedAtDateObj = new Date(responseDataResult.createdAt);
      const responseUpdatedAtDateObj = new Date(responseDataResult.updatedAt);

      expect(!isNaN(responseCreatedAtDateObj.getTime())).toEqual(true);
      expect(!isNaN(responseUpdatedAtDateObj.getTime())).toEqual(true);
    });
  });
  describe("【異常パターン】", () => {
    it("【titleプロパティと入力値がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const requestNotTitleData = { body: "ダミーボディ" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(requestNotTitleData);

      expect(response.body).toEqual({
        message: "titleの内容は必須です。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("【titleプロパティ有り・入力値(1文字以上)がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const requestNotTitleCharacterData = { title: "", body: "ダミーボディ" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(requestNotTitleCharacterData);

      expect(response.body).toEqual({
        message: "titleは1文字以上である必要があります。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("【bodyプロパティと入力値がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const requestNotBodyData = { title: "ダミータイトル" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(requestNotBodyData);

      expect(response.body).toEqual({
        message: "bodyの内容は必須です。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("【bodyプロパティ有り・入力値(1文字以上)がない場合】createTodoSchemaに基づくInvalidErrorのテスト。", async () => {
      const requestNotBodyCharacterData = { title: "ダミータイトル", body: "" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send(requestNotBodyCharacterData);

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
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
