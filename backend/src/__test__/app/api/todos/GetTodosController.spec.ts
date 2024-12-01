import { StatusCodes } from "http-status-codes";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { TodoRepository } from "../../../../repositories/todos/TodoRepository";
import {
  createTestUser,
  requestAPI,
  requestAPIWithAuth,
} from "../../../helper/requestHelper";
import type { TodoResponseType } from "../../../helper/types/testTypes";

const prisma = new PrismaClient();

describe("【APIテスト】 Todo一覧取得", () => {
  let newUser: User;
  beforeEach(async () => {
    newUser = await createTestUser();
  });
  describe("【DBにデータあり】", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 20; i++) {
        await prisma.todo.create({
          data: {
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
            userId: newUser.id,
          },
        });
      }
    });
    it("【パラメーターの指定なし】先頭から10件のTodoを取得できる。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const todoItems: TodoResponseType[] = response.body;

      expect(todoItems.length).toEqual(10);
      expect(todoItems.map((todo) => todo.id)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]);
      expect(todoItems.map((todo) => todo.title)).toEqual([
        "ダミータイトル1",
        "ダミータイトル2",
        "ダミータイトル3",
        "ダミータイトル4",
        "ダミータイトル5",
        "ダミータイトル6",
        "ダミータイトル7",
        "ダミータイトル8",
        "ダミータイトル9",
        "ダミータイトル10",
      ]);
      expect(todoItems.map((todo) => todo.body)).toEqual([
        "ダミーボディ1",
        "ダミーボディ2",
        "ダミーボディ3",
        "ダミーボディ4",
        "ダミーボディ5",
        "ダミーボディ6",
        "ダミーボディ7",
        "ダミーボディ8",
        "ダミーボディ9",
        "ダミーボディ10",
      ]);
    });
    it("【page=2,count=5】6件目から5件のTodoを取得できる。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos?page=2&count=5",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const todoItems: TodoResponseType[] = response.body;

      expect(todoItems.length).toEqual(5);
      expect(todoItems.map((todo) => todo.id)).toEqual([6, 7, 8, 9, 10]);
      expect(todoItems.map((todo) => todo.title)).toEqual([
        "ダミータイトル6",
        "ダミータイトル7",
        "ダミータイトル8",
        "ダミータイトル9",
        "ダミータイトル10",
      ]);
      expect(todoItems.map((todo) => todo.body)).toEqual([
        "ダミーボディ6",
        "ダミーボディ7",
        "ダミーボディ8",
        "ダミーボディ9",
        "ダミーボディ10",
      ]);
    });
    it("【page=2】11件目から10件のTodoを取得できる。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos?page=2",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const todoItems: TodoResponseType[] = response.body;

      expect(todoItems.length).toEqual(10);
      expect(todoItems.map((todo) => todo.id)).toEqual([
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ]);
      expect(todoItems.map((todo) => todo.title)).toEqual([
        "ダミータイトル11",
        "ダミータイトル12",
        "ダミータイトル13",
        "ダミータイトル14",
        "ダミータイトル15",
        "ダミータイトル16",
        "ダミータイトル17",
        "ダミータイトル18",
        "ダミータイトル19",
        "ダミータイトル20",
      ]);
      expect(todoItems.map((todo) => todo.body)).toEqual([
        "ダミーボディ11",
        "ダミーボディ12",
        "ダミーボディ13",
        "ダミーボディ14",
        "ダミーボディ15",
        "ダミーボディ16",
        "ダミーボディ17",
        "ダミーボディ18",
        "ダミーボディ19",
        "ダミーボディ20",
      ]);
    });
    it("【count=3】先頭から3件のTodoを取得できる。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos?count=3",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const todoItems: TodoResponseType[] = response.body;

      expect(todoItems.length).toEqual(3);
      expect(todoItems.map((todo) => todo.id)).toEqual([1, 2, 3]);
      expect(todoItems.map((todo) => todo.title)).toEqual([
        "ダミータイトル1",
        "ダミータイトル2",
        "ダミータイトル3",
      ]);
      expect(todoItems.map((todo) => todo.body)).toEqual([
        "ダミーボディ1",
        "ダミーボディ2",
        "ダミーボディ3",
      ]);
    });
  });
  describe("【DBにデータなし】", () => {
    it("【空配列が返る】データがない状態でのTodo一覧取得", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos",
        statusCode: StatusCodes.OK,
        userId: newUser.id,
      });

      const todoItems: TodoResponseType[] = response.body;

      expect(todoItems).toEqual([]);
    });
  });
  describe("【異常パターン】", () => {
    it("【パラメーターに指定した値が不正(page=整数の1以上でない値)の場合】getTodosSchemaに基づくInvalidErrorのテスト。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos?page=0",
        statusCode: StatusCodes.BAD_REQUEST,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "pageは1以上の整数のみ。" });
    });
    it("【パラメーターに指定した値が不正(count=整数の1以上でない値)の場合】getTodosSchemaに基づくInvalidErrorのテスト。", async () => {
      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos?count=0",
        statusCode: StatusCodes.BAD_REQUEST,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "countは1以上の整数のみ。" });
    });
    it("【認証ユーザーでない場合】エラーメッセージとstatus(UNAUTHORIZED=401)が返る。", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos/",
        statusCode: StatusCodes.UNAUTHORIZED,
      });

      expect(response.body).toEqual({
        message: "認証に失敗しました。",
      });
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)とstatus(InternalServerError=500)が返る", async () => {
      jest.spyOn(TodoRepository.prototype, "list").mockImplementation(() => {
        throw new Error("Unexpected Error");
      });

      const response = await requestAPIWithAuth({
        method: "get",
        endPoint: "/api/todos",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        userId: newUser.id,
      });

      expect(response.body).toEqual({ message: "Internal Server Error" });
    });
  });
});