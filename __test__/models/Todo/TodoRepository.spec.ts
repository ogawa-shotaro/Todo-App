import { TodoEntity } from "../../../models/entities";
import { TodoRepository } from "../../../repositories/TodoRepository";

describe("TodoRepositoryクラス", () => {
  it("インスタンス生成時(引数なし)", () => {
    const instance = new TodoRepository();
    expect(instance).toBeInstanceOf(TodoRepository);
  });

  it("インスタンス生成時(引数あり)", () => {
    const instance = new TodoRepository([
      { title: "ダミータイトル", body: "ダミーボディ" },
    ]);
    expect(instance).toBeInstanceOf(TodoRepository);
  });
});

describe("saveメソッド", () => {
  it("メソッドを実行すると、idがインクリメントされたインスタンスが返ってくる。", () => {
    const instance = new TodoRepository();
    const result1 = instance.save({
      title: "ダミータイトル1",
      body: "ダミーボディ1",
    });
    const result2 = instance.save({
      title: "ダミータイトル2",
      body: "ダミーボディ2",
    });
    expect(result1).toBeInstanceOf(TodoEntity);
    expect(result1.id).toEqual(1);
    expect(result1.title).toEqual("ダミータイトル1");
    expect(result1.body).toEqual("ダミーボディ1");
    expect(result1.createdAt).toBeInstanceOf(Date);
    expect(result1.updatedAt).toBeInstanceOf(Date);

    expect(result2).toBeInstanceOf(TodoEntity);
    expect(result2.id).toEqual(2);
    expect(result2.title).toEqual("ダミータイトル2");
    expect(result2.body).toEqual("ダミーボディ2");
    expect(result2.createdAt).toBeInstanceOf(Date);
    expect(result2.updatedAt).toBeInstanceOf(Date);
  });

  describe("listメソッド", () => {
    it("メソッドを実行すると、DBに入力内容が保持され、その値を取得する事ができる。", () => {
      const instance = new TodoRepository([
        { title: "ダミータイトル1", body: "ダミーボディ1" },
        { title: "ダミータイトル2", body: "ダミーボディ2" },
      ]);

      const result = instance.list();
      const result1 = result[0];
      const result2 = result[1];

      expect(result1).toBeInstanceOf(TodoEntity);
      expect(result1.id).toEqual(1);
      expect(result1.title).toEqual("ダミータイトル1");
      expect(result1.body).toEqual("ダミーボディ1");
      expect(result1.createdAt).toBeInstanceOf(Date);
      expect(result1.updatedAt).toBeInstanceOf(Date);

      expect(result2).toBeInstanceOf(TodoEntity);
      expect(result2.id).toEqual(2);
      expect(result2.title).toEqual("ダミータイトル2");
      expect(result2.body).toEqual("ダミーボディ2");
      expect(result2.createdAt).toBeInstanceOf(Date);
      expect(result2.updatedAt).toBeInstanceOf(Date);
    });

    it("メソッドを実行すると、初期データの後にデータを追加し、そのデータ内容を取得する事できる。", () => {
      const instance = new TodoRepository([
        { title: "ダミータイトル1", body: "ダミーボディ1" },
        { title: "ダミータイトル2", body: "ダミーボディ2" },
      ]);
      const result = instance.save({
        title: "ダミータイトル3",
        body: "ダミーボディ3",
      });
      const list = instance.list();

      expect(list.length).toEqual(3);
      expect(result).toEqual(list[2]);
    });
  });
});
