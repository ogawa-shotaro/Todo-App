import { StatusCodes } from "http-status-codes";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/todos/TodoRepository";
import {
  createTestUser,
  requestAPI,
  requestAPIWithAuth,
} from "../../../helper/requestHelper";

const prisma = new PrismaClient();

describe("【APIテスト】Todo一件の更新", () => {
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
    it("【id:1のデータ更新】タイトルのみ", async () => {
      const request = {
        title: "変更後のタイトル",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      const { id, title, body, userId } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("ダミーボディ1");
      expect(userId).toEqual(newUser.id);
    });
    it("【id:1のデータ更新】ボディのみ", async () => {
      const request = {
        body: "変更後のボディ",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      const { id, title, body, userId } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("変更後のボディ");
      expect(userId).toEqual(newUser.id);
    });
    it("【id:2のデータ更新】タイトルとボディ", async () => {
      const request = {
        title: "変更後のタイトル",
        body: "変更後のボディ",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/2",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      }).send(request);

      const { id, title, body, userId } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("変更後のボディ");
      expect(userId).toEqual(newUser.id);
    });
  });
  describe("【異常パターン】", () => {
    it("タイトルに不適切な値(文字列ではない値)が入力された場合、リクエストはエラーになる。", async () => {
      const request = 123;

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.BAD_REQUEST,
        userId: newUser.id,
      }).send({ title: request });

      expect(response.body).toEqual({
        message: "入力内容が不適切(文字列のみ)です。",
      });
    });
    it("ボディに不適切な値(文字列ではない値)が入力された場合、リクエストはエラーになる。", async () => {
      const request = 123;

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.BAD_REQUEST,
        userId: newUser.id,
      }).send({ body: request });

      expect(response.body).toEqual({
        message: "入力内容が不適切(文字列のみ)です。",
      });
    });
    it("存在しないIDへのリクエストはエラーになる。", async () => {
      const request = {
        title: "変更タイトル",
        body: "変更ボディ",
      };

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/999",
        statusCode: StatusCodes.NOT_FOUND,
        userId: newUser.id,
      }).send(request);

      expect(response.body).toEqual({
        message: "Todoの更新に失敗しました。",
      });
    });
    it("【認証ユーザーでない場合】エラーメッセージとstatus(UNAUTHORIZED=401)が返る。", async () => {
      const request = {
        title: "変更タイトル",
        body: "変更ボディ",
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.UNAUTHORIZED,
      }).send(request);

      expect(response.body).toEqual({
        message: "認証に失敗しました。",
      });
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージとstatus(InternalServerError=500)が返る。", async () => {
      jest.spyOn(TodoRepository.prototype, "update").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPIWithAuth({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
    });
  });
});