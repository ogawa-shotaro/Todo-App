import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import { UserRepository } from "../../../../repositories/UserRepository";
import { requestAPIWithAuth } from "../../../helper/requestAPIWithAuth";

const prisma = new PrismaClient();

describe("【APIテスト】 Todo一件の削除", () => {
  let cookie: string;
  beforeAll(async () => {
    const repository = new UserRepository();
    const userData = await repository.register({
      name: "ダミーユーザー",
      password: "dammyPassword",
      email: "dammyData@mail.com",
    });
    const userId = userData.user.id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    cookie = `token=${token}`;
  });
  describe("【成功パターン】", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 3; i++) {
        await prisma.todo.create({
          data: {
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
            userId: 1,
          },
        });
      }
    });
    it("【deleteメソッド実行前】DBに格納されているTodoは3件である。", async () => {
      const dbOldData = await prisma.todo.findMany({});

      expect(dbOldData.length).toEqual(3);
    });
    it("【id:1のデータ削除】", async () => {
      const response = await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
        cookie,
      });
      const { id, title, body, userId } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("ダミーボディ1");
      expect(userId).toEqual(1);
    });
    it("【deleteメソッド実行後】3件のTodoから1件のデータが削除されている。", async () => {
      await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
        cookie,
      });

      const dbCurrentData = await prisma.todo.findMany({});

      expect(dbCurrentData.length).toEqual(2);
    });
  });
  describe("【異常パターン】", () => {
    it("存在しないIDへのリクエストはエラーになる。", async () => {
      const response = await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/todos/999",
        statusCode: StatusCodes.NOT_FOUND,
        cookie,
      });

      expect(response.body).toEqual({
        message: "Todoの削除に失敗しました。",
      });
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
    it("指定したIDが不正(整数の1以上でない値)の場合、エラーになる。", async () => {
      const response = await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/todos/0",
        statusCode: StatusCodes.BAD_REQUEST,
        cookie,
      });

      expect(response.body).toEqual({ message: "IDは1以上の整数のみ。" });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る。", async () => {
      jest.spyOn(TodoRepository.prototype, "delete").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPIWithAuth({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        cookie,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
