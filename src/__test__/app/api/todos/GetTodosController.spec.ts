import { requestAPI } from "../../../helper/requestHelper";
import type { TodoResponseType } from "../../../helper/types/testTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("[APIテスト] Todo一覧取得", () => {
  describe("DBにデータあり", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 3; i++) {
        await prisma.todo.create({
          data: {
            title: "ダミータイトル" + i,
            body: "ダミーボディ" + i,
          },
        });
      }
    });
    it("データがある状態でTodo一覧を取得する", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos",
        statusCode: 200,
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
  describe("DBにデータなし", () => {
    it("データがない状態でTodo一覧を取得する", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos",
        statusCode: 200,
      });

      const todoItems: TodoResponseType[] = response.body;

      expect(todoItems).toEqual([]);
    });
  });
  describe("異常パターン", () => {
    it("パラメーターに指定した値が不正(page=整数の1以上でない値)の場合、エラーになる", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos?page=0",
        statusCode: 400,
      });

      expect(response.body).toEqual({ message: "pageは1以上の整数のみ。" });
    });
    it("パラメーターに指定した値が不正(count=整数の1以上でない値)の場合、エラーになる", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos?count=0",
        statusCode: 400,
      });

      expect(response.body).toEqual({ message: "countは1以上の整数のみ。" });
    });
  });
});
