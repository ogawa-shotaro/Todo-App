import { TodoEntity } from "../../entities/Todo";

describe("TodoEntityクラス", () => {
  describe("正常パターン", () => {
    it("タイトルとボディに入力内容(1文字以上)があれば、Todo情報を作成する事ができる", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      expect(instance.getTodoEntity.id).toEqual(1);
      expect(instance.getTodoEntity.title).toEqual("ダミータイトル");
      expect(instance.getTodoEntity.body).toEqual("ダミーボディ");
      expect(instance.getTodoEntity.createdAt).toBeInstanceOf(Date);
      expect(instance.getTodoEntity.updatedAt).toBeInstanceOf(Date);
    });

    it("cloneメソッドを実行すると、Todoデータのコピーした値を返す", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      const sameInstance = instance.clone();

      expect(sameInstance.getTodoEntity.id).toEqual(1);
      expect(sameInstance.getTodoEntity.title).toEqual("ダミータイトル");
      expect(sameInstance.getTodoEntity.body).toEqual("ダミーボディ");
      expect(sameInstance.getTodoEntity.createdAt).toBeInstanceOf(Date);
      expect(sameInstance.getTodoEntity.updatedAt).toBeInstanceOf(Date);
    });

    it("updateメソッドを実行すると、作成後のTodo情報を更新する事ができる", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      instance.update({
        title: "変更後のタイトル",
        body: "変更後のボディ",
      });

      expect(instance.getTodoEntity.id).toEqual(1);
      expect(instance.getTodoEntity.title).toEqual("変更後のタイトル");
      expect(instance.getTodoEntity.body).toEqual("変更後のボディ");
      expect(instance.getTodoEntity.createdAt).toBeInstanceOf(Date);
      expect(instance.getTodoEntity.updatedAt).toBeInstanceOf(Date);
    });
  });
  describe("異常パターン", () => {
    it("タイトルが未入力だとエラーになる", () => {
      const data = {
        id: 1,
        title: "",
        body: "ダミーボディ",
      };

      expect(() => {
        new TodoEntity(data);
      }).toThrow("titleの内容は必須です");
    });

    it("ボディが未入力だエラーになる", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "",
      };

      expect(() => {
        new TodoEntity(data);
      }).toThrow("bodyの内容は必須です");
    });

    it("タイトルが未入力だと、Todo情報の更新を中断する", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      expect(() => {
        instance.update({ title: "", body: "変更後のボディ" });
      }).toThrow("更新処理を中断(titleの更新データがない為)");
    });

    it("ボディが未入力だと、Todo情報の更新を中断する", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      expect(() => {
        instance.update({ title: "変更後のタイトル", body: "" });
      }).toThrow("更新処理を中断(bodyの更新データがない為)");
    });
  });
});
