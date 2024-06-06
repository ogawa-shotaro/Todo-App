import { requestAPI } from "../../../helper/requestHelper";
import { TodoResponseType } from "../../../helper/types/ITodoResponseType";

describe("getメソッドのテスト(Todo一覧取得APIの動作テスト)", () => {
  beforeAll(async () => {
    for (let i = 1; i <= 3; i++) {
      const data = {
        title: `ダミータイトル${i}`,
        body: `ダミーボディ${i}`,
      };
      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 200,
      }).send(data);
    }
  });
  it("成功パターン", async () => {
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
