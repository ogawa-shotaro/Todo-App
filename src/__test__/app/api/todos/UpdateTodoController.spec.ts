import { StatusCodes } from "http-status-codes";

import { PrismaClient } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/TodoRepository";
import { requestAPI } from "../../../helper/requestHelper";

const prisma = new PrismaClient();

describe("【APIテスト】Todo一件の更新", () => {
  describe("【成功パターン】", () => {
    beforeAll(async () => {
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
    beforeEach(async () => {
      for (let i = 1; i <= 2; i++) {
        await prisma.todo.create({
          data: {
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
            user: {
              connect: { id: i },
            },
          },
        });
      }
    });
    it("【id:1のデータ更新】タイトルのみ", async () => {
      const data = {
        title: "変更後のタイトル",
        user_id: 1,
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("ダミーボディ1");
    });
    it("【id:1のデータ更新】ボディのみ", async () => {
      const data = {
        body: "変更後のボディ",
        user_id: 1,
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("変更後のボディ");
    });
    it("【id:2のデータ更新】タイトルとボディ", async () => {
      const data = {
        title: "変更後のタイトル",
        body: "変更後のボディ",
        user_id: 2,
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/2",
        statusCode: StatusCodes.OK,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("変更後のボディ");
    });
  });
  describe("【異常パターン】", () => {
    it("タイトルに不適切な値(文字列ではない値)が入力された場合、リクエストはエラーになる。", async () => {
      const data = 123;

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send({ title: data, user_id: 1 });

      expect(response.body).toEqual({
        message: "入力内容が不適切(文字列のみ)です。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("ボディに不適切な値(文字列ではない値)が入力された場合、リクエストはエラーになる。", async () => {
      const data = 123;

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.BAD_REQUEST,
      }).send({ body: data, user_id: 1 });

      expect(response.body).toEqual({
        message: "入力内容が不適切(文字列のみ)です。",
      });
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("存在しないIDへのリクエストはエラーになる。", async () => {
      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/999",
        statusCode: StatusCodes.NOT_FOUND,
      }).send({ title: "ダミータイトル", body: "ダミーボディ", user_id: 999 });

      expect(response.body).toEqual({
        message: "存在しないIDを指定しました。",
      });
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る。", async () => {
      jest.spyOn(TodoRepository.prototype, "update").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
