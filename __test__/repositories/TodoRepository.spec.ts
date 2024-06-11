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

      it("listメソッドを実行時、パラメーターの指定がない場合は、先頭から10件のデータを取得する", () => {
        const instance = new TodoRepository();
        for (let i = 1; i <= 21; i++) {
          instance.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const list = instance.list();

        expect(list.length).toEqual(10);
        expect(list.map((e) => e.getTodoEntity.id)).toEqual([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ]);
        expect(list[0].getTodoEntity.title).toEqual("ダミータイトル1");
        expect(list[0].getTodoEntity.body).toEqual("ダミーボディ1");
      });

      it("listメソッドを実行時、パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータを取得する", () => {
        const instance = new TodoRepository();
        for (let i = 1; i <= 21; i++) {
          instance.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const list = instance.list({ page: 2 });

        expect(list.length).toEqual(10);
        expect(list.map((e) => e.getTodoEntity.id)).toEqual([
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]);
        expect(list[0].getTodoEntity.title).toEqual("ダミータイトル11");
        expect(list[0].getTodoEntity.body).toEqual("ダミーボディ11");
      });

      it("listメソッドを実行時、パラメーターの指定(count=5)をした場合、先頭から5件のデータを取得する", () => {
        const instance = new TodoRepository();
        for (let i = 1; i <= 11; i++) {
          instance.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const list = instance.list({ count: 5 });

        expect(list.length).toEqual(5);
        expect(list.map((e) => e.getTodoEntity.id)).toEqual([1, 2, 3, 4, 5]);
        expect(list[4].getTodoEntity.title).toEqual("ダミータイトル5");
        expect(list[4].getTodoEntity.body).toEqual("ダミーボディ5");
      });

      it("listメソッドを実行時、パラメーターの指定(page=2,count=3)をした場合、4件目のデータから3件のデータを取得する", () => {
        const instance = new TodoRepository();
        for (let i = 1; i <= 11; i++) {
          instance.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const list = instance.list({ page: 2, count: 3 });
        expect(list.length).toEqual(3);
        expect(list.map((e) => e.getTodoEntity.id)).toEqual([4, 5, 6]);
        expect(list[0].getTodoEntity.title).toEqual("ダミータイトル4");
        expect(list[0].getTodoEntity.body).toEqual("ダミーボディ4");
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

      it("deleteメソッドを実行すると、DB内の指定した(ID)データを削除する事ができる。", () => {
        const instance = new TodoRepository([
          { title: "ダミータイトル1", body: "ダミーボディ1" },
          { title: "ダミータイトル2", body: "ダミーボディ2" },
        ]);
        const dbOldData = instance.list();
        instance.delete(1);
        const dbCurrentData = instance.list({ page: 1, count: 10 });

        expect(dbOldData[0].getTodoEntity.id).toEqual(1);
        expect(dbOldData[1].getTodoEntity.id).toEqual(2);

        expect(dbCurrentData[0].getTodoEntity.id).toEqual(2);
        expect(dbOldData.length).toEqual(2);
        expect(dbCurrentData.length).toEqual(1);
      });
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
