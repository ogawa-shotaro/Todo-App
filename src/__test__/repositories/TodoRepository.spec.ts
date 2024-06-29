import { TodoRepository } from "../../repositories/TodoRepository";
import { PrismaClient } from "@prisma/client";
import type { Todo } from "@prisma/client";

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

        const initialDataResult: Todo = await repository.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
        });

        const secondDataResult: Todo = await repository.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
        });

        expect(initialDataResult.id).toEqual(1);
        expect(initialDataResult.title).toEqual("ダミータイトル1");
        expect(initialDataResult.body).toEqual("ダミーボディ1");
        expect(initialDataResult.createdAt).toBeInstanceOf(Date);
        expect(initialDataResult.updatedAt).toBeInstanceOf(Date);

        expect(secondDataResult.id).toEqual(2);
        expect(secondDataResult.title).toEqual("ダミータイトル2");
        expect(secondDataResult.body).toEqual("ダミーボディ2");
        expect(secondDataResult.createdAt).toBeInstanceOf(Date);
        expect(secondDataResult.updatedAt).toBeInstanceOf(Date);
      });
      it("listメソッドを実行時、パラメーターの指定がない場合は、先頭から10件のデータを取得する", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 11; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }

        const listDataResult = await repository.list();

        expect(listDataResult.length).toEqual(10);
        expect(listDataResult[2].id).toEqual(3);
        expect(listDataResult[2].title).toEqual("ダミータイトル3");
        expect(listDataResult[2].body).toEqual("ダミーボディ3");
      });
      it("listメソッドを実行時、パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータを取得する", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 21; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }

        const listDataResult = await repository.list({ page: 2 });

        expect(listDataResult.length).toEqual(10);
        expect(listDataResult[0].id).toEqual(11);
        expect(listDataResult[0].title).toEqual("ダミータイトル11");
        expect(listDataResult[0].body).toEqual("ダミーボディ11");
      });
      it("listメソッドを実行時、パラメーターの指定(count=5)をした場合、先頭から5件のデータを取得する", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 11; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const listDataResult = await repository.list({ count: 5 });

        expect(listDataResult.length).toEqual(5);
        expect(listDataResult[4].id).toEqual(5);
        expect(listDataResult[4].title).toEqual("ダミータイトル5");
        expect(listDataResult[4].body).toEqual("ダミーボディ5");
      });
      it("listメソッドを実行時、パラメーターの指定(page=2,count=3)をした場合、4件目のデータから3件のデータを取得する", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 11; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const listDataResult = await repository.list({ page: 2, count: 3 });

        expect(listDataResult.length).toEqual(3);
        expect(listDataResult[0].id).toEqual(4);
        expect(listDataResult[0].title).toEqual("ダミータイトル4");
        expect(listDataResult[0].body).toEqual("ダミーボディ4");
      });
      it("findメソッドを実行すると、DBに保持されているデータから、一件の値を取得する事ができる", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 3; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }

        const initialDataResult = await repository.find(1);
        const secondDataResult = await repository.find(2);

        expect(initialDataResult?.id).toEqual(1);
        expect(initialDataResult?.title).toEqual("ダミータイトル1");
        expect(initialDataResult?.body).toEqual("ダミーボディ1");
        expect(initialDataResult?.createdAt).toBeInstanceOf(Date);
        expect(initialDataResult?.updatedAt).toBeInstanceOf(Date);

        expect(secondDataResult?.id).toEqual(2);
        expect(secondDataResult?.title).toEqual("ダミータイトル2");
        expect(secondDataResult?.body).toEqual("ダミーボディ2");
        expect(secondDataResult?.createdAt).toBeInstanceOf(Date);
        expect(secondDataResult?.updatedAt).toBeInstanceOf(Date);
      });
      it("updateメソッドを実行すると、DB内のデータを更新する事ができる。", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 3; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }

        const latestResult: Todo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });

        expect(latestResult).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: latestResult.createdAt,
          updatedAt: latestResult.updatedAt,
        });
      });
      it("updateメソッドを実行した後は、updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 3; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }

        const latestDate = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });

        expect(latestDate.createdAt < latestDate.updatedAt).toBeTruthy();
      });
      it("deleteメソッドを実行すると、DB内の指定した(ID)データを削除する事ができる。", async () => {
        const repository = new TodoRepository();

        for (let i = 1; i <= 3; i++) {
          await repository.save({
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
          });
        }
        const dbOldData = await repository.list();
        await repository.delete(1);
        const dbCurrentData = await repository.list();

        expect(dbOldData.length).toEqual(3);
        expect(dbOldData[0].id).toEqual(1);
        expect(dbOldData[1].id).toEqual(2);

        expect(dbCurrentData.length).toEqual(2);
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
