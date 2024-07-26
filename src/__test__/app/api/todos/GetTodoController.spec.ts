import { requestAPI } from "../../../helper/requestHelper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("[APIテスト] Todo1件の取得", () => {
  describe("成功パターン", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 2; i++) {
        await prisma.todo.create({
          data: {
            title: "ダミータイトル" + i,
            body: "ダミーボディ" + i,
          },
        });
      }
    });
    it("id:1のデータ取得", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos/1",
        statusCode: 200,
      });

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("ダミーボディ1");
    });
    it("id:2のデータ取得", async () => {
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos/2",
        statusCode: 200,
      });

      const { id, title, body } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("ダミータイトル2");
      expect(body).toEqual("ダミーボディ2");
    });
  });
});
