import { requestAPI } from "../../../helper/requestHelper";
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
      const dbOldData = await prisma.todo.findMany({});

      expect(dbOldData.length).toEqual(3);
    });
    it("id:1のデータ削除", async () => {
      const response = await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: 200,
      });
      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("ダミーボディ1");
    });
    it("deleteメソッド実行後、3件のTodoから1件のデータが削除されている。", async () => {
      await requestAPI({
        method: "delete",
        endPoint: "/api/todos/1",
        statusCode: 200,
      });

      const dbCurrentData = await prisma.todo.findMany({});

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
