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
      const clonedInstance = instance.clone();

      expect(clonedInstance.getTodoEntity.id).toEqual(1);
      expect(clonedInstance.getTodoEntity.title).toEqual("ダミータイトル");
      expect(clonedInstance.getTodoEntity.body).toEqual("ダミーボディ");
      expect(clonedInstance.getTodoEntity.createdAt).toBeInstanceOf(Date);
      expect(clonedInstance.getTodoEntity.updatedAt).toBeInstanceOf(Date);

      expect(instance !== clonedInstance).toBeTruthy();
    });

    it("updateメソッドを実行すると、Todo情報(titleの内容)を更新する事ができる", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      instance.update({
        title: "変更後のタイトル",
        body: "ダミーボディ",
      });

      expect(instance.getTodoEntity.id).toEqual(1);
      expect(instance.getTodoEntity.title).toEqual("変更後のタイトル");
      expect(instance.getTodoEntity.body).toEqual("ダミーボディ");
      expect(instance.getTodoEntity.createdAt).toBeInstanceOf(Date);
      expect(instance.getTodoEntity.updatedAt).toBeInstanceOf(Date);
    });

    it("updateメソッドを実行すると、Todo情報(ボディの内容)を更新する事ができる", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      instance.update({
        title: "ダミータイトル",
        body: "変更後のボディ",
      });

      expect(instance.getTodoEntity.id).toEqual(1);
      expect(instance.getTodoEntity.title).toEqual("ダミータイトル");
      expect(instance.getTodoEntity.body).toEqual("変更後のボディ");
      expect(instance.getTodoEntity.createdAt).toBeInstanceOf(Date);
      expect(instance.getTodoEntity.updatedAt).toBeInstanceOf(Date);
    });

    it("getTodoEntityを実行すると、インスタンスのプロパティの値をオブジェクトで取得できる", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };
      const instance = new TodoEntity(data);

      expect(instance).toBeInstanceOf(TodoEntity);
      expect(instance.getTodoEntity).toBeInstanceOf(Object);
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

    it("更新データがない場合、Todo情報の更新を中断する", () => {
      const data = {
        id: 1,
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const instance = new TodoEntity(data);
      expect(() => {
        instance.update({ title: "", body: "" });
      }).toThrow("更新処理を中断(更新データがない為)");
    });
  });
});
