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
        expect(result1.getTodoEntity.id).toEqual(1);
        expect(result1.getTodoEntity.title).toEqual("ダミータイトル1");
        expect(result1.getTodoEntity.body).toEqual("ダミーボディ1");
        expect(result1.getTodoEntity.createdAt).toBeInstanceOf(Date);
        expect(result1.getTodoEntity.updatedAt).toBeInstanceOf(Date);

        expect(result2).toBeInstanceOf(TodoEntity);
        expect(result2.getTodoEntity.id).toEqual(2);
        expect(result2.getTodoEntity.title).toEqual("ダミータイトル2");
        expect(result2.getTodoEntity.body).toEqual("ダミーボディ2");
        expect(result2.getTodoEntity.createdAt).toBeInstanceOf(Date);
        expect(result2.getTodoEntity.updatedAt).toBeInstanceOf(Date);
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

        expect(result1?.getTodoEntity.id).toEqual(1);
        expect(result1?.getTodoEntity.title).toEqual("ダミータイトル1");
        expect(result1?.getTodoEntity.body).toEqual("ダミーボディ1");
        expect(result1?.getTodoEntity.createdAt).toBeInstanceOf(Date);
        expect(result1?.getTodoEntity.updatedAt).toBeInstanceOf(Date);

        const result2: TodoEntity | null = instance.find(2);

        expect(result2?.getTodoEntity.id).toEqual(2);
        expect(result2?.getTodoEntity.title).toEqual("ダミータイトル2");
        expect(result2?.getTodoEntity.body).toEqual("ダミーボディ2");
        expect(result2?.getTodoEntity.createdAt).toBeInstanceOf(Date);
        expect(result2?.getTodoEntity.updatedAt).toBeInstanceOf(Date);
      });

      it("updateメソッドを実行すると、DB内のデータを更新する事ができる。", () => {
        const instance = new TodoRepository();
        const dammyData = instance.save({
          title: "ダミータイトル",
          body: "ダミーボディ",
        });
        const result = instance.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });

        expect(result).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: dammyData.getTodoEntity.createdAt,
          updatedAt: result.updatedAt,
        });
      });

      it("updateメソッドを実行した後は、updatedAtの方がcreatedAtよりも新しい時間になっている。", () => {
        const instance = new TodoRepository();
        instance.save({
          title: "ダミータイトル",
          body: "ダミーボディ",
        });
        const latestData = instance.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });

        expect(latestData.createdAt <= latestData.updatedAt).toBeTruthy();
        expect(latestData.createdAt !== latestData.updatedAt).toBeTruthy();
      });
    });

    it("deleteメソッドを実行すると、DB内の指定した(ID)データを削除する事ができる。", () => {
      const instance = new TodoRepository([
        { title: "ダミータイトル1", body: "ダミーボディ1" },
        { title: "ダミータイトル2", body: "ダミーボディ2" },
      ]);

      const dbOldData = instance.list();
      instance.delete(1);
      const dbCurrentData = instance.list();

      expect(dbOldData[0].getTodoEntity.id).toEqual(1);
      expect(dbOldData[1].getTodoEntity.id).toEqual(2);

      expect(dbCurrentData[0].getTodoEntity.id).not.toEqual(1);
      expect(dbCurrentData[0].getTodoEntity.id).toEqual(2);

      expect(dbOldData.length > dbCurrentData.length).toBeTruthy();
    });
  });

  describe("異常パターン", () => {
    it("不正なIDを指定した場合(findメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(() => {
        repository.find(0);
      }).toThrow("idは必須です(1以上の数値)");
    });

    it("存在しないIDの値を取得しようとした場合、nullが返る", () => {
      const repository = new TodoRepository();
      const entity = repository.find(999);

      expect(entity).toBeNull();
    });

    it("不正なIDを指定した場合(updateメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(() => {
        repository.update({
          id: 0,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });
      }).toThrow("idは必須です(1以上の数値)");
    });

    it("存在しないIDの値を更新しようとした場合、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(() => {
        repository.update({
          id: 999,
          title: "ダミータイトル",
          body: "ダミーボディ",
        });
      }).toThrow("idに該当するtodoが存在しません。");
    });

    it("不正なIDを指定した場合(deleteメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(() => {
        repository.delete(0);
      }).toThrow("idは必須です(1以上の数値)");
    });

    it("存在しないIDの値を削除しようとした場合、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(() => {
        repository.delete(999);
      }).toThrow("idに該当するtodoが存在しません。");
    });
  });
});
