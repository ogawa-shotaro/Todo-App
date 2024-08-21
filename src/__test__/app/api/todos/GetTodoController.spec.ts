import { requestAPI } from "../../../helper/requestHelper";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

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
        statusCode: StatusCodes.OK,
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
        statusCode: StatusCodes.OK,
      });

      const { id, title, body } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("ダミータイトル2");
      expect(body).toEqual("ダミーボディ2");
    });
  });
});
describe("異常パターン", () => {
  it("存在しないIDへのリクエストはエラーになる", async () => {
    const response = await requestAPI({
      method: "get",
      endPoint: "/api/todos/999",
      statusCode: StatusCodes.NOT_FOUND,
    });

    expect(response.body).toEqual({ message: "存在しないIDを指定しました。" });
  });
  it("指定したIDが不正(整数の1以上でない値)の場合、エラーになる", async () => {
    const response = await requestAPI({
      method: "get",
      endPoint: "/api/todos/0",
      statusCode: StatusCodes.BAD_REQUEST,
    });

    expect(response.body).toEqual({ message: "IDは1以上の整数のみ。" });
  });
});
