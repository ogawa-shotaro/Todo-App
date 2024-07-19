import { requestAPI } from "../../../helper/requestHelper";
import { TodoResponseType } from "../../../helper/types/TodoResponseType";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("[APIテスト] Todo一件の削除", () => {
  describe("成功パターン", () => {
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
    it("deleteメソッド実行前、DBに格納されているTodoは3件である。", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos",
        statusCode: 200,
      });

      const todoItems: TodoResponseType[] = response.body;
      const dbOldData = todoItems;

      expect(dbOldData.length).toEqual(3);
    });
    it("id:1のデータ削除", async () => {
      await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: 200,
      });

      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos",
        statusCode: 200,
      });

      const notFirstIdTodos: TodoResponseType[] = response.body;
      const actualIds = notFirstIdTodos.map((todo) => todo.id);

      expect(actualIds).toEqual([2, 3]);
    });
    it("deleteメソッド実行後、3件のTodoから1件のデータが削除されている。", async () => {
      await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: 200,
      });

      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos",
        statusCode: 200,
      });
      const notFirstIdTodos: TodoResponseType[] = response.body;
      const dbCurrentData = notFirstIdTodos;

      expect(dbCurrentData.length).toEqual(2);
    });
  });
  describe("異常パターン", () => {
    it("存在しないIDへのリクエストはエラーになる", async () => {
      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/todos/999",
        statusCode: 404,
      });
      const { code, message, stat } = response.body;

      expect(response.statusCode).toEqual(404);
      expect(code).toEqual(404);
      expect(message).toEqual("Not found");
      expect(stat).toEqual("fail");
    });
  });
});
