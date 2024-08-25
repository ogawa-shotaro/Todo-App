import { TodoRepository } from "../../repositories/TodoRepository";
import { PrismaClient } from "@prisma/client";
import { TodoUpdatedInput } from "../../types/TodoRequest.type";
import type { Todo } from "@prisma/client";
import type { TodoUpdatedBadInput } from "../helper/types/testTypes";

const prisma = new PrismaClient();

describe("【TodoRepositoryのテスト】", () => {
  describe("【成功パターン】", () => {
    describe("【インスタンスのテスト】", () => {
      it("TodoRepositoryのインスタンスが生成される。", () => {
        const repository = new TodoRepository();

        expect(repository).toBeInstanceOf(TodoRepository);
      });
    });
    describe("【saveメソッドのテスト】", () => {
      it("【saveメソッドを実行時】DBに値を保持し、その値に重複しないIDが付与される。", async () => {
        const repository = new TodoRepository();

        const initialTodo: Todo = await repository.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
        });

        const secondTodo: Todo = await repository.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
        });

        expect(initialTodo.id).toEqual(1);
        expect(initialTodo.title).toEqual("ダミータイトル1");
        expect(initialTodo.body).toEqual("ダミーボディ1");
        expect(initialTodo.createdAt).toBeInstanceOf(Date);
        expect(initialTodo.updatedAt).toBeInstanceOf(Date);

        expect(secondTodo.id).toEqual(2);
        expect(secondTodo.title).toEqual("ダミータイトル2");
        expect(secondTodo.body).toEqual("ダミーボディ2");
        expect(secondTodo.createdAt).toBeInstanceOf(Date);
        expect(secondTodo.updatedAt).toBeInstanceOf(Date);
      });
    });
    describe("【list・update・deleteメソッドのテスト】", () => {
      beforeEach(async () => {
        for (let i = 1; i <= 21; i++) {
          await prisma.todo.create({
            data: {
              title: "ダミータイトル" + i,
              body: "ダミーボディ" + i,
            },
          });
        }
      });
      it("【listメソッドを実行時】パラメーターの指定がない場合は、先頭から10件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list();

        expect(todoList.length).toEqual(10);
        expect(todoList[2].id).toEqual(3);
        expect(todoList[2].title).toEqual("ダミータイトル3");
        expect(todoList[2].body).toEqual("ダミーボディ3");
      });
      it("【listメソッドを実行時】パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list({ page: 2 });

        expect(todoList.length).toEqual(10);
        expect(todoList[0].id).toEqual(11);
        expect(todoList[0].title).toEqual("ダミータイトル11");
        expect(todoList[0].body).toEqual("ダミーボディ11");
      });
      it("【listメソッドを実行時】パラメーターの指定(count=5)をした場合、先頭から5件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list({ count: 5 });

        expect(todoList.length).toEqual(5);
        expect(todoList[4].id).toEqual(5);
        expect(todoList[4].title).toEqual("ダミータイトル5");
        expect(todoList[4].body).toEqual("ダミーボディ5");
      });
      it("【listメソッドを実行時】パラメーターの指定(page=2,count=3)をした場合、4件目のデータから3件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list({ page: 2, count: 3 });

        expect(todoList.length).toEqual(3);
        expect(todoList[0].id).toEqual(4);
        expect(todoList[0].title).toEqual("ダミータイトル4");
        expect(todoList[0].body).toEqual("ダミーボディ4");
      });
      it("【findメソッドを実行時】DBに保持されているデータから、一件のTodoを取得する事ができる。", async () => {
        const repository = new TodoRepository();

        const initialTodo = await repository.find(1);
        const secondTodo = await repository.find(2);

        expect(initialTodo?.id).toEqual(1);
        expect(initialTodo?.title).toEqual("ダミータイトル1");
        expect(initialTodo?.body).toEqual("ダミーボディ1");
        expect(initialTodo?.createdAt).toBeInstanceOf(Date);
        expect(initialTodo?.updatedAt).toBeInstanceOf(Date);

        expect(secondTodo?.id).toEqual(2);
        expect(secondTodo?.title).toEqual("ダミータイトル2");
        expect(secondTodo?.body).toEqual("ダミーボディ2");
        expect(secondTodo?.createdAt).toBeInstanceOf(Date);
        expect(secondTodo?.updatedAt).toBeInstanceOf(Date);
      });
      it("【updateメソッドを実行時】DB内のTodoを更新する事ができる。", async () => {
        const repository = new TodoRepository();

        const updatedTodo: Todo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });

        expect(updatedTodo).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: updatedTodo.createdAt,
          updatedAt: updatedTodo.updatedAt,
        });
      });
      it("【updateメソッドを実行時】updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();

        const updatedTodo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });

        expect(updatedTodo.createdAt < updatedTodo.updatedAt).toBeTruthy();
      });
      it("【deleteメソッドを実行時】DB内の指定したTodoを削除する事ができる。", async () => {
        const repository = new TodoRepository();

        const oldTodos = await repository.list();
        const deletedTodo = await repository.delete(1);
        const newTodos = await repository.list();

        const oldTodoIds = oldTodos.map((todo) => todo.id);
        const newTodoIds = newTodos.map((todo) => todo.id);

        expect(deletedTodo.id).toEqual(1);
        expect(oldTodoIds).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(newTodoIds).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      });
    });
  });
  describe("【異常パターン】", () => {
    it("【saveメソッドを実行時】タイトル or ボディに値がない場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.save({ title: "", body: "ダミーボディ" });
      }).rejects.toThrow("titleの内容は必須です");

      expect(async () => {
        await repository.save({ title: "ダミータイトル", body: "" });
      }).rejects.toThrow("bodyの内容は必須です");
    });
    it("【listメソッド実行時】クエリーパラメーターが不正な場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.list({ page: 0 });
      }).rejects.toThrow("pageは1以上の整数のみ");

      expect(async () => {
        await repository.list({ count: 0 });
      }).rejects.toThrow("countは1以上の整数のみ");
    });
    it("【findメソッド実行時】指定したIDが不正な場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.find(0);
      }).rejects.toThrow("IDは1以上の整数のみ。");
    });
    it("【findメソッド実行時】指定したIDのデータがない場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.find(999);
      }).rejects.toThrow("存在しないIDを指定しました。");
    });
    it("【updateメソッド実行時】不正なパラメーターでリクエストした場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();
      const badInputCharacters: TodoUpdatedBadInput = {
        id: 1,
        title: 123,
        body: 456,
      };

      expect(async () => {
        await repository.update(badInputCharacters as TodoUpdatedInput);
      }).rejects.toThrow("入力内容が不適切(文字列のみ)です。");
    });
    it("【updateメソッド実行時】不正なIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.update({
          id: 999,
          title: "変更後のタイトル",
          body: "変更後のボディ",
        });
      }).rejects.toThrow("存在しないIDを指定しました。");
    });
    it("【deleteメソッド実行時】不正なIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.delete(999);
      }).rejects.toThrow("存在しないIDを指定しました。");
    });
  });
});
