import { requestAPI } from "../../../helper/requestHelper";
import { TodoResponseType } from "../../../helper/types/TodoResponseType";

describe("deleteメソッドのテスト(Todo一件の削除とAPIの動作テスト)", () => {
  describe("成功パターン", () => {
    beforeAll(async () => {
      for (let i = 1; i <= 3; i++) {
        const data = {
          title: `ダミータイトル${i}`,
          body: `ダミーボディ${i}`,
        };
        await requestAPI({
          method: "post",
          endPoint: "/api/todos/",
          statusCode: 200,
        }).send(data);
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
      const response = await requestAPI({
        method: "get",
        endPoint: "/api/todos",
        statusCode: 200,
      });
      const todoItems: TodoResponseType[] = response.body;
      const dbCurrentData = todoItems;
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
