import { PrismaClient } from "@prisma/client";
import type { Todo, User } from "@prisma/client";

import { InternalServerError } from "../../errors/InternalServerError";
import { TodoRepository } from "../../repositories/todos/TodoRepository";
import { createTestUser } from "../helper/requestHelper";

const prisma = new PrismaClient();

describe("【TodoRepositoryのテスト】", () => {
  let newUser: User;
  beforeEach(async () => {
    newUser = await createTestUser();
  });
  describe("【成功パターン】", () => {
    describe("【saveメソッドのテスト】", () => {
      it("【saveメソッドを実行時】DBに値を保持し、その値に重複しないIDが付与される。", async () => {
        const repository = new TodoRepository();

        const initialTodo: Todo = await repository.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
          userId: newUser.id,
        });

        const secondTodo: Todo = await repository.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
          userId: newUser.id,
        });

        expect(initialTodo.id).toEqual(1);
        expect(initialTodo.title).toEqual("ダミータイトル1");
        expect(initialTodo.body).toEqual("ダミーボディ1");
        expect(initialTodo.createdAt).toBeInstanceOf(Date);
        expect(initialTodo.updatedAt).toBeInstanceOf(Date);
        expect(initialTodo.userId).toEqual(newUser.id);

        expect(secondTodo.id).toEqual(2);
        expect(secondTodo.title).toEqual("ダミータイトル2");
        expect(secondTodo.body).toEqual("ダミーボディ2");
        expect(secondTodo.createdAt).toBeInstanceOf(Date);
        expect(secondTodo.updatedAt).toBeInstanceOf(Date);
        expect(secondTodo.userId).toEqual(newUser.id);
      });
    });
    describe("【list・find・update・deleteメソッドのテスト】", () => {
      beforeEach(async () => {
        for (let i = 1; i <= 21; i++) {
          await prisma.todo.create({
            data: {
              title: `ダミータイトル${i}`,
              body: `ダミーボディ${i}`,
              user: {
                connect: { id: newUser.id },
              },
            },
          });
        }
      });
      it("【listメソッドを実行時】パラメーターの指定がない場合は、先頭から10件のデータとTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const result = await repository.list({ userId: newUser.id });

        expect(result.items.length).toEqual(10);
        expect(result.items[2].id).toEqual(3);
        expect(result.items[2].title).toEqual("ダミータイトル3");
        expect(result.items[2].body).toEqual("ダミーボディ3");

        expect(result.totalCount).toEqual(21);
      });
      it("【listメソッドを実行時】パラメーターの指定(page=2)をした場合、11件目のデータから20件のデータとTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const result = await repository.list({ userId: newUser.id, page: 2 });

        expect(result.items.length).toEqual(10);
        expect(result.items[0].id).toEqual(11);
        expect(result.items[0].title).toEqual("ダミータイトル11");
        expect(result.items[0].body).toEqual("ダミーボディ11");

        expect(result.totalCount).toEqual(21);
      });
      it("【listメソッドを実行時】パラメーターの指定(count=5)をした場合、先頭から5件のデータとTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const result = await repository.list({ userId: newUser.id, count: 5 });

        expect(result.items.length).toEqual(5);
        expect(result.items[4].id).toEqual(5);
        expect(result.items[4].title).toEqual("ダミータイトル5");
        expect(result.items[4].body).toEqual("ダミーボディ5");

        expect(result.totalCount).toEqual(21);
      });
      it("【listメソッドを実行時】パラメーターの指定(page=2,count=3)をした場合、4件目のデータから3件のデータとTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const result = await repository.list({
          userId: newUser.id,
          page: 2,
          count: 3,
        });

        expect(result.items.length).toEqual(3);
        expect(result.items[0].id).toEqual(4);
        expect(result.items[0].title).toEqual("ダミータイトル4");
        expect(result.items[0].body).toEqual("ダミーボディ4");

        expect(result.totalCount).toEqual(21);
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
          userId: newUser.id,
        });

        expect(updatedTodo).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: updatedTodo.createdAt,
          updatedAt: updatedTodo.updatedAt,
          userId: newUser.id,
        });
      });
      it("【updateメソッドを実行時】updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();

        const updatedTodo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: newUser.id,
        });

        expect(updatedTodo.createdAt < updatedTodo.updatedAt).toBeTruthy();
      });
      it("【deleteメソッドを実行時】DB内の指定したTodoを削除する事ができる。", async () => {
        const repository = new TodoRepository();

        const oldTodos = await repository.list({ userId: newUser.id });
        const deletedTodo = await repository.delete({
          userId: newUser.id,
          todoId: 1,
        });
        const newTodos = await repository.list({ userId: newUser.id });

        expect(deletedTodo.id).toEqual(1);
        expect(oldTodos.totalCount).toEqual(21);
        expect(newTodos.totalCount).toEqual(20);
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
          userId: newUser.id,
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
          userId: newUser.id,
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

      await expect(
        repository.delete({ userId: newUser.id, todoId: 1 }),
      ).rejects.toThrow("データベースにエラーが発生しました。");
    });
  });
});
