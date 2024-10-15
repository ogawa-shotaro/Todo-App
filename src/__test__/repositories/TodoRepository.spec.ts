import { PrismaClient } from "@prisma/client";
import type { Todo, User } from "@prisma/client";

import { InternalServerError } from "../../errors/InternalServerError";
import { TodoRepository } from "../../repositories/TodoRepository";

const prisma = new PrismaClient();

describe("【TodoRepositoryのテスト】", () => {
  let newUser: User;
  beforeEach(async () => {
    const user = await prisma.user.create({
      data: {
        name: "ダミーユーザー",
        password: "dummyPassword",
        email: `dummyData${new Date()}@mail.com`,
      },
    });
    newUser = user;
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

        expect(initialTodo.title).toEqual("ダミータイトル1");
        expect(initialTodo.body).toEqual("ダミーボディ1");
        expect(initialTodo.createdAt).toBeInstanceOf(Date);
        expect(initialTodo.updatedAt).toBeInstanceOf(Date);
        expect(initialTodo.userId).toEqual(newUser.id);

        expect(secondTodo.title).toEqual("ダミータイトル2");
        expect(secondTodo.body).toEqual("ダミーボディ2");
        expect(secondTodo.createdAt).toBeInstanceOf(Date);
        expect(secondTodo.updatedAt).toBeInstanceOf(Date);
        expect(secondTodo.userId).toEqual(newUser.id);
      });
    });
    describe("【list・find・update・deleteメソッドのテスト】", () => {
      let todos: Todo[];
      beforeEach(async () => {
        todos = [];
        for (let i = 1; i <= 21; i++) {
          const todo: Todo = await prisma.todo.create({
            data: {
              title: `ダミータイトル${i}`,
              body: `ダミーボディ${i}`,
              user: {
                connect: { id: newUser.id },
              },
            },
          });
          todos.push(todo);
        }
      });
      it("【listメソッドを実行時】パラメーターの指定がない場合は、先頭から10件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list();

        expect(todoList.length).toEqual(10);
        expect(todoList.map((todo) => todo.id)).toEqual(
          todos.slice(0, 10).map((todo) => todo.id),
        );
        expect(todoList[2].title).toEqual("ダミータイトル3");
        expect(todoList[2].body).toEqual("ダミーボディ3");
      });
      it("【listメソッドを実行時】パラメーターの指定(page=2)をした場合、11件目のデータから10件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list({ page: 2 });

        expect(todoList.length).toEqual(10);
        expect(todoList.map((todo) => todo.id)).toEqual(
          todos.slice(10, 20).map((todo) => todo.id),
        );
        expect(todoList[0].title).toEqual("ダミータイトル11");
        expect(todoList[0].body).toEqual("ダミーボディ11");
      });
      it("【listメソッドを実行時】パラメーターの指定(count=5)をした場合、先頭から5件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list({ count: 5 });

        expect(todoList.length).toEqual(5);
        expect(todoList.map((todo) => todo.id)).toEqual(
          todos.slice(0, 5).map((todo) => todo.id),
        );
        expect(todoList[4].title).toEqual("ダミータイトル5");
        expect(todoList[4].body).toEqual("ダミーボディ5");
      });
      it("【listメソッドを実行時】パラメーターの指定(page=2,count=3)をした場合、4件目のデータから3件のデータを取得する。", async () => {
        const repository = new TodoRepository();
        const todoList = await repository.list({ page: 2, count: 3 });

        expect(todoList.length).toEqual(3);
        expect(todoList.map((todo) => todo.id)).toEqual(
          todos.slice(3, 6).map((todo) => todo.id),
        );
        expect(todoList[0].title).toEqual("ダミータイトル4");
        expect(todoList[0].body).toEqual("ダミーボディ4");
      });
      it("【findメソッドを実行時】DBに保持されているデータから、一件のTodoを取得する事ができる。", async () => {
        const repository = new TodoRepository();
        const todoId = todos.map((todo) => todo.id);

        const initialTodo = await repository.find({ todoId: todoId[0] });
        const secondTodo = await repository.find({ todoId: todoId[1] });

        expect(initialTodo?.id).toEqual(todoId[0]);
        expect(initialTodo?.title).toEqual("ダミータイトル1");
        expect(initialTodo?.body).toEqual("ダミーボディ1");
        expect(initialTodo?.createdAt).toBeInstanceOf(Date);
        expect(initialTodo?.updatedAt).toBeInstanceOf(Date);
        expect(initialTodo?.userId).toEqual(newUser.id);

        expect(secondTodo?.id).toEqual(todoId[1]);
        expect(secondTodo?.title).toEqual("ダミータイトル2");
        expect(secondTodo?.body).toEqual("ダミーボディ2");
        expect(secondTodo?.createdAt).toBeInstanceOf(Date);
        expect(secondTodo?.updatedAt).toBeInstanceOf(Date);
        expect(initialTodo?.userId).toEqual(newUser.id);
      });
      it("【updateメソッドを実行時】DB内のTodoを更新する事ができる。", async () => {
        const repository = new TodoRepository();
        const todoId = todos.map((todo) => todo.id);

        const updatedTodo: Todo = await repository.update({
          id: todoId[0],
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: newUser.id,
        });

        expect(updatedTodo).toEqual({
          id: todoId[0],
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: updatedTodo.createdAt,
          updatedAt: updatedTodo.updatedAt,
          userId: newUser.id,
        });
      });
      it("【updateメソッドを実行時】updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();
        const todoId = todos.map((todo) => todo.id);

        const updatedTodo = await repository.update({
          id: todoId[0],
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: newUser.id,
        });

        expect(updatedTodo.createdAt < updatedTodo.updatedAt).toBeTruthy();
      });
      it("【deleteメソッドを実行時】DB内の指定したTodoを削除する事ができる。", async () => {
        const repository = new TodoRepository();
        const todoId = todos.map((todo) => todo.id);

        const oldTodos = await repository.list();
        const deletedTodo = await repository.delete({
          userId: newUser.id,
          todoId: todoId[0],
        });
        const newTodos = await repository.list();

        const oldTodoIds = oldTodos.map((todo) => todo.id);
        const newTodoIds = newTodos.map((todo) => todo.id);

        expect(deletedTodo.id).toEqual(todoId[0]);
        expect(oldTodoIds).toEqual(todos.slice(0, 10).map((todo) => todo.id));
        expect(newTodoIds).toEqual(todos.slice(1, 11).map((todo) => todo.id));
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
