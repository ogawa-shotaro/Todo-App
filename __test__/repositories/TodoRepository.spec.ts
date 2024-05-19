import { TodoEntity } from "../../entities/Todo";
import { TodoRepository } from "../../repositories/TodoRepository";

describe("TodoRepository", () => {
  describe("成功パターン", () => {
    describe("インスタンスのテスト", () => {
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

    describe("メソッドのテスト", () => {
      it("saveメソッドを実行すると、DBに値を保持し、その値に重複しないIDが付与される", () => {
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

      it("初期データの後にデータを追加し、そのデータ内容を一覧取得(listメソッド)する事できる。", () => {
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

      it("findメソッドを実行すると、DBに保持されているデータから、一件の値を取得する事ができる", () => {
        const instance = new TodoRepository();

        instance.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
        });

        instance.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
        });

        const result1: TodoEntity | null = instance.find(1);

        expect(result1?.id).toEqual(1);
        expect(result1?.title).toEqual("ダミータイトル1");
        expect(result1?.body).toEqual("ダミーボディ1");
        expect(result1?.createdAt).toBeInstanceOf(Date);
        expect(result1?.updatedAt).toBeInstanceOf(Date);

        const result2: TodoEntity | null = instance.find(2);

        expect(result2?.id).toEqual(2);
        expect(result2?.title).toEqual("ダミータイトル2");
        expect(result2?.body).toEqual("ダミーボディ2");
        expect(result2?.createdAt).toBeInstanceOf(Date);
        expect(result2?.updatedAt).toBeInstanceOf(Date);
      });
    });
  });

  describe("異常パターン", () => {
    it("存在しないIDの値を取得しようとした場合、nullが返る", () => {
      const repository = new TodoRepository();
      const entity = repository.find(999);

      expect(entity).toBeNull();
    });
  });
});
