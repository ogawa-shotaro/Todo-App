import { requestAPI } from "../../../helper/requestHelper";

describe("getメソッドのテスト(Todo一件の取得とAPIの動作テスト)", () => {
  describe("成功パターン", () => {
    beforeAll(async () => {
      for (let i = 1; i <= 3; i++) {
        const data = {
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        };
        const response = await requestAPI({
          method: "post",
          endPoint: "/api/todos/",
          statusCode: 200,
        }).send(data);
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
  describe("異常パターン", () => {
    it("存在しないIDへのリクエストはエラーになる", async () => {
      const response = await requestAPI({
        method: "get",
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
