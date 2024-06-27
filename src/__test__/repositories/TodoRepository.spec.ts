import { TodoRepository } from "../../repositories/TodoRepository";
import { PrismaClient, Todo } from "@prisma/client";
const prisma = new PrismaClient();

describe("TodoRepository", () => {
  describe("成功パターン", () => {
    describe("インスタンスのテスト", () => {
      it("TodoRepositoryのインスタンスが生成される", () => {
        const repository = new TodoRepository();
        expect(repository).toBeInstanceOf(TodoRepository);
      });
    });
    describe("メソッドのテスト", () => {
      it("saveメソッドを実行すると、DBに値を保持し、その値に重複しないIDが付与される", async () => {
        const repository = new TodoRepository();
        const result1: Todo = await repository.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
        });
        const result2: Todo = await repository.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
        });
        expect(result1.id).toEqual(1);
        expect(result1.title).toEqual("ダミータイトル1");
        expect(result1.body).toEqual("ダミーボディ1");
        expect(result1.createdAt).toBeInstanceOf(Date);
        expect(result1.updatedAt).toBeInstanceOf(Date);
        expect(result2.id).toEqual(2);
        expect(result2.title).toEqual("ダミータイトル2");
        expect(result2.body).toEqual("ダミーボディ2");
        expect(result2.createdAt).toBeInstanceOf(Date);
        expect(result2.updatedAt).toBeInstanceOf(Date);
      });
      it("listメソッドを実行時、パラメーターの指定がない場合は、先頭から10件のデータを取得する", async () => {
        const repository = new TodoRepository();
        for (let i = 1; i <= 21; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const list = await repository.list();
        expect(list.length).toEqual(10);
        expect(list.map((e) => e.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(list[2].title).toEqual("ダミータイトル3");
        expect(list[2].body).toEqual("ダミーボディ3");
      });
      it("listメソッドを実行時、パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータを取得する", async () => {
        const instance = new TodoRepository();
        const list = await instance.list({ page: 2 });
        expect(list.length).toEqual(10);
        expect(list.map((e) => e.id)).toEqual([
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]);
        expect(list[0].title).toEqual("ダミータイトル11");
        expect(list[0].body).toEqual("ダミーボディ11");
      });
      it("listメソッドを実行時、パラメーターの指定(count=5)をした場合、先頭から5件のデータを取得する", async () => {
        const repository = new TodoRepository();
        const list = await repository.list({ count: 5 });
        expect(list.length).toEqual(5);
        expect(list.map((e) => e.id)).toEqual([1, 2, 3, 4, 5]);
        expect(list[4].title).toEqual("ダミータイトル5");
        expect(list[4].body).toEqual("ダミーボディ5");
      });
      it("listメソッドを実行時、パラメーターの指定(page=2,count=3)をした場合、4件目のデータから3件のデータを取得する", async () => {
        const repository = new TodoRepository();
        const list = await repository.list({ page: 2, count: 3 });
        expect(list.length).toEqual(3);
        expect(list.map((e) => e.id)).toEqual([4, 5, 6]);
        expect(list[0].title).toEqual("ダミータイトル4");
        expect(list[0].body).toEqual("ダミーボディ4");
      });
      it("findメソッドを実行すると、DBに保持されているデータから、一件の値を取得する事ができる", async () => {
        const repository = new TodoRepository();
        const result1 = await repository.find(1);
        expect(result1?.id).toEqual(1);
        expect(result1?.title).toEqual("ダミータイトル1");
        expect(result1?.body).toEqual("ダミーボディ1");
        expect(result1?.createdAt).toBeInstanceOf(Date);
        expect(result1?.updatedAt).toBeInstanceOf(Date);
        const result2 = await repository.find(2);
        expect(result2?.id).toEqual(2);
        expect(result2?.title).toEqual("ダミータイトル2");
        expect(result2?.body).toEqual("ダミーボディ2");
        expect(result2?.createdAt).toBeInstanceOf(Date);
        expect(result2?.updatedAt).toBeInstanceOf(Date);
      });
      it("updateメソッドを実行すると、DB内のデータを更新する事ができる。", async () => {
        const repository = new TodoRepository();
        const result: Todo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });
        expect(result).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        });
      });
      it("updateメソッドを実行した後は、updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();
        const latestData = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });
        expect(latestData.createdAt < latestData.updatedAt).toBeTruthy();
      });
      it("deleteメソッドを実行すると、DB内の指定した(ID)データを削除する事ができる。", async () => {
        const repository = new TodoRepository();
        const dbOldData = await repository.list();
        await repository.delete(1);
        const dbCurrentData = await repository.list();
        expect(dbOldData[0].id).toEqual(1);
        expect(dbOldData[1].id).toEqual(2);
        expect(dbCurrentData[0].id).toEqual(2);
      });
    });
  });
  describe("異常パターン", () => {
    it("不正なIDを指定した場合(listメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();
      expect(async () => {
        await repository.list({ page: 0 });
      }).rejects.toThrow("pageは1以上の整数のみ");
      expect(async () => {
        await repository.list({ count: 0 });
      }).rejects.toThrow("countは1以上の整数のみ");
    });

    it("不正なIDを指定した場合(findメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();
      expect(async () => {
        await repository.find(999);
      }).rejects.toThrow("存在しないIDを指定しました。");
    });

    it("不正なIDを指定した場合(updateメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.update({
          id: 999,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });
      }).rejects.toThrow("存在しないIDを指定しました。");
    });

    it("不正なIDを指定した場合(deleteメソッド実行時)、エラーオブジェクトが返る", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.delete(999);
      }).rejects.toThrow("存在しないIDを指定しました。");
    });
  });
});
