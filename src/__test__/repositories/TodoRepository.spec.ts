import { PrismaClient } from "@prisma/client";
import type { Todo } from "@prisma/client";

import { InternalServerError } from "../../errors/InternalServerError";
import { TodoRepository } from "../../repositories/TodoRepository";
import { UserRepository } from "../../repositories/UserRepository";

const prisma = new PrismaClient();

describe("【TodoRepositoryのテスト】", () => {
  beforeAll(async () => {
    const repository = new UserRepository();

    for (let i = 1; i <= 2; i++) {
      await repository.register({
        name: `ダミーユーザー${i}`,
        password: `dammyPassword${i}`,
        email: `dammyData${i}@mail.com`,
      });
    }
  });
  describe("【成功パターン】", () => {
    describe("【saveメソッドのテスト】", () => {
      it("【saveメソッドを実行時】DBに値を保持し、その値に重複しないIDが付与される。", async () => {
        const repository = new TodoRepository();

        const initialTodo: Todo = await repository.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
          userId: 1,
        });

        const secondTodo: Todo = await repository.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
          userId: 2,
        });

        expect(initialTodo.id).toEqual(1);
        expect(initialTodo.title).toEqual("ダミータイトル1");
        expect(initialTodo.body).toEqual("ダミーボディ1");
        expect(initialTodo.createdAt).toBeInstanceOf(Date);
        expect(initialTodo.updatedAt).toBeInstanceOf(Date);
        expect(initialTodo.userId).toEqual(1);

        expect(secondTodo.id).toEqual(2);
        expect(secondTodo.title).toEqual("ダミータイトル2");
        expect(secondTodo.body).toEqual("ダミーボディ2");
        expect(secondTodo.createdAt).toBeInstanceOf(Date);
        expect(secondTodo.updatedAt).toBeInstanceOf(Date);
        expect(secondTodo.userId).toEqual(2);
      });
    });
    describe("【list・find・update・deleteメソッドのテスト】", () => {
      beforeEach(async () => {
        for (let i = 1; i <= 21; i++) {
          await prisma.todo.create({
            data: {
              title: "ダミータイトル" + i,
              body: "ダミーボディ" + i,
              user: {
                connect: { id: 1 },
              },
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

        const initialTodo = await repository.find({ todoId: 1 });
        const secondTodo = await repository.find({ todoId: 2 });

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
          userId: 1,
        });

        expect(updatedTodo).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: updatedTodo.createdAt,
          updatedAt: updatedTodo.updatedAt,
          userId: 1,
        });
      });
      it("【updateメソッドを実行時】updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();

        const updatedTodo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: 1,
        });

        expect(updatedTodo.createdAt < updatedTodo.updatedAt).toBeTruthy();
      });
      it("【deleteメソッドを実行時】DB内の指定したTodoを削除する事ができる。", async () => {
        const repository = new TodoRepository();

        const oldTodos = await repository.list();
        const deletedTodo = await repository.delete({ userId: 1, todoId: 1 });
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
    it("【findメソッド実行時】存在しないIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.find({ todoId: 999 });
      }).rejects.toThrow("存在しないIDを指定しました。");
    });
    it("【updateメソッド実行時】ユーザーIDがない or 存在しないIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.update({
          id: 999,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: 1,
        });
      }).rejects.toThrow("Todoの更新に失敗しました。");

      expect(async () => {
        await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: 999,
        });
      }).rejects.toThrow("Todoの更新に失敗しました。");
    });
    it("【updateメソッド実行時】プログラムの意図しないエラー(DB側の問題等)は、InternalServerErrorが返る。", async () => {
      const repository = new TodoRepository();

      jest.spyOn(repository, "update").mockImplementationOnce(async () => {
        throw new InternalServerError("データベースにエラーが発生しました。");
      });

      await expect(
        repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: 1,
        }),
      ).rejects.toThrow("データベースにエラーが発生しました。");
    });
    it("【deleteメソッド実行時】ユーザーIDがない or 存在しないIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.delete({ userId: 1, todoId: 999 });
      }).rejects.toThrow("Todoの削除に失敗しました。");

      expect(async () => {
        await repository.delete({ userId: 999, todoId: 1 });
      }).rejects.toThrow("Todoの削除に失敗しました。");
    });
    it("【deleteメソッド実行時】プログラムの意図しないエラー(DB側の問題等)は、InternalServerErrorが返る。", async () => {
      const repository = new TodoRepository();

      jest.spyOn(repository, "delete").mockImplementationOnce(async () => {
        throw new InternalServerError("データベースにエラーが発生しました。");
      });

      await expect(repository.delete({ userId: 1, todoId: 1 })).rejects.toThrow(
        "データベースにエラーが発生しました。",
      );
    });
  });
});
