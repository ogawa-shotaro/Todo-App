import { requestAPI } from "../../../helper/requestHelper";

describe("updateメソッドのテスト(Todo一件の更新とAPIの動作テスト)", () => {
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

    it("id:1のデータ更新(タイトルのみ)", async () => {
      const data = {
        title: "変更後のタイトル",
        body: "ダミーボディ1",
      };
      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: 200,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("ダミーボディ1");
    });

    it("id:1のデータ更新(ボディのみ)", async () => {
      const data = {
        title: "ダミータイトル",
        body: "変更後のボディ",
      };
      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: 200,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("ダミータイトル");
      expect(body).toEqual("変更後のボディ");
    });

    it("id:1のデータ更新(タイトルとボディ)", async () => {
      const data = {
        title: "変更後のタイトル",
        body: "変更後のボディ",
      };
      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/1",
        statusCode: 200,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(1);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("変更後のボディ");
    });

    it("id:2のデータ更新(タイトルとボディ)", async () => {
      const data = {
        title: "変更後のタイトル",
        body: "変更後のボディ",
      };
      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/2",
        statusCode: 200,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(2);
      expect(title).toEqual("変更後のタイトル");
      expect(body).toEqual("変更後のボディ");
    });

    it("id:3のデータ更新(タイトルとボディ)", async () => {
      const data = {
        title: "変更後のタイトル",
        body: "変更後のボディ",
      };
      const response = await requestAPI({
        method: "put",
        endPoint: "/api/todos/3",
        statusCode: 200,
      }).send(data);

      const { id, title, body } = response.body;

      expect(id).toEqual(3);
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
