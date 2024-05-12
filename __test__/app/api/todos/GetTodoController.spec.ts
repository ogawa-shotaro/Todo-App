import { requestAPI } from "../../../helper/requestHelper";

describe("getメソッドのテスト(Todo一件の取得とAPIの動作テスト)", () => {
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
  it("ID:1の成功パターン", async () => {
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
  it("ID:2の成功パターン", async () => {
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
