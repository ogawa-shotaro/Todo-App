import { requestAPI } from "../../../helper/requestHelper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("[APIテスト] Todo一件の更新", () => {
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
    it("id:1のデータ更新(タイトルのみ)", async () => {
      const requestTitleData = {
        title: "変更後のタイトル",
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: 200,
      }).send(requestTitleData);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("ダミーボディ1");
    });
    it("id:1のデータ更新(ボディのみ)", async () => {
      const requestBodyData = {
        body: "変更後のボディ",
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: 200,
      }).send(requestBodyData);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル1");
      expect(body).toEqual("変更後のボディ");
    });
    it("id:2のデータ更新(タイトルとボディ)", async () => {
      const requestBothData = {
        title: "変更後のタイトル",
        body: "変更後のボディ",
      };

      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/2",
        statusCode: 200,
      }).send(requestBothData);

      const { id, title, body } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("変更後のボディ");
    });
  });
  describe("異常パターン", () => {
    it("存在しないIDへのリクエストはエラーになる", async () => {
      const response = await requestAPI({
        method: "put",
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
