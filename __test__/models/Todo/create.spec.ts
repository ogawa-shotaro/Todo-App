import { create } from "../../../models/Todo";

describe("createメソッドのテスト", () => {
  it("メソッド実行時、titleプロパティの値が入力されていないとエラーになる。", () => {
    const data = {
      title: "",
      body: "詳細文",
    };
    expect(() => create(data)).toThrow("titleの内容は必須です");
  });

  it("メソッド実行時、bodyプロパティの値が入力されていないとエラーになる。", () => {
    const data = {
      title: "詳細文",
      body: "",
    };
    expect(() => create(data)).toThrow("bodyの内容は必須です");
  });

  it("メソッド実行時、正しい引数を渡すと、新規にTodoデータを作成し、Todo配列にデータを追加する", () => {
    const data = {
      title: "ダミータイトル",
      body: "ダミーボディ",
    };

    const createTodo = create(data);
    expect(createTodo).toEqual({
      id: createTodo.id,
      title: data.title,
      body: data.body,
      createdAt: createTodo.createdAt,
      updatedAt: createTodo.updatedAt,
    });
  });
});
