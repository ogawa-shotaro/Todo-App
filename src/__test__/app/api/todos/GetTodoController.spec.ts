import { StatusCodes } from "http-status-codes";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import {
  createTestUser,
  requestAPIWithAuth,
} from "../../../helper/requestHelper";

const prisma = new PrismaClient();

describe("【APIテスト】Todo1件の取得", () => {
  let newUser: User;
  beforeEach(async () => {
    newUser = await createTestUser();
  });
  describe("【成功パターン】", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 2; i++) {
        await prisma.todo.create({
          data: {
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
            userId: newUser.id,
          },
        });
      }
    });
    it("【id:1】のデータ取得", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const { id, title, body, userId } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("ダミーボディ1");
      expect(userId).toEqual(newUser.id);
    });
    it("【id:2】のデータ取得", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos/2",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const { id, title, body, userId } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("ダミータイトル2");
      expect(body).toEqual("ダミーボディ2");
      expect(userId).toEqual(newUser.id);
    });
  });

  describe("【異常パターン】", () => {
    it("存在しないIDへのリクエストはエラーになる。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos/999",
        statusCode: StatusCodes.NOT_FOUND,
        userId: newUser.id,
      });

      expect(response.body).toEqual({
        message: "存在しないIDを指定しました。",
      });
    });
    it("指定したIDが不正(整数の1以上でない値)の場合、エラーになる。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos/0",
        statusCode: StatusCodes.BAD_REQUEST,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "IDは1以上の整数のみ。" });
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る", async () => {
      jest.spyOn(TodoRepository.prototype, "find").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
    });
  });
});
