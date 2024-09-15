import { StatusCodes } from "http-status-codes";

import { PrismaClient } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import { requestAPI } from "../../../helper/requestHelper";

const prisma = new PrismaClient();

describe("【APIテスト】 Todo一件の削除", () => {
  describe("【成功パターン】", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 3; i++) {
        await prisma.todo.create({
          data: {
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          },
        });
      }
    });
    it("【deleteメソッド実行前】DBに格納されているTodoは3件である。", async () => {
      const dbOldData = await prisma.todo.findMany({});

      expect(dbOldData.length).toEqual(3);
    });
    it("【id:1のデータ削除】", async () => {
      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
      });
      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("ダミーボディ1");
    });
    it("【deleteメソッド実行後】3件のTodoから1件のデータが削除されている。", async () => {
      await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
      });

      const dbCurrentData = await prisma.todo.findMany({});

      expect(dbCurrentData.length).toEqual(2);
    });
  });
  describe("【異常パターン】", () => {
    it("存在しないIDへのリクエストはエラーになる。", async () => {
      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/todos/999",
        statusCode: StatusCodes.NOT_FOUND,
      });

      expect(response.body).toEqual({
        message: "存在しないIDを指定しました。",
      });
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
    it("指定したIDが不正(整数の1以上でない値)の場合、エラーになる。", async () => {
      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/todos/0",
        statusCode: StatusCodes.BAD_REQUEST,
      });

      expect(response.body).toEqual({ message: "IDは1以上の整数のみ。" });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る。", async () => {
      jest.spyOn(TodoRepository.prototype, "delete").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
