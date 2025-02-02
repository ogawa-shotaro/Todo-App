import { PrismaClient } from "@prisma/client";
import type { Todo, User } from "@prisma/client";

import { InternalServerError } from "../../errors/InternalServerError";
import { TodoRepository } from "../../repositories/todos/TodoRepository";
import { createTestUser } from "../helper/requestHelper";

const prisma = new PrismaClient();

describe("【TodoRepositoryのテスト】", () => {
  let firstUser: User;
  let secondUser: User;
  describe("【成功パターン】新規Todoの作成テスト", () => {
    describe("【saveメソッドのテスト】", () => {
      it("【saveメソッドを実行時】DBに値を保持し、その値に重複しないIDが付与される。", async () => {
        firstUser = await createTestUser();
        const repository = new TodoRepository();

        const initialTodo: Todo = await repository.save({
          title: "ダミータイトル1",
          body: "ダミーボディ1",
          userId: firstUser.id,
        });

        const secondTodo: Todo = await repository.save({
          title: "ダミータイトル2",
          body: "ダミーボディ2",
          userId: firstUser.id,
        });

        expect(initialTodo.id).toEqual(1);
        expect(initialTodo.title).toEqual("ダミータイトル1");
        expect(initialTodo.body).toEqual("ダミーボディ1");
        expect(initialTodo.createdAt).toBeInstanceOf(Date);
        expect(initialTodo.updatedAt).toBeInstanceOf(Date);
        expect(initialTodo.userId).toEqual(firstUser.id);

        expect(secondTodo.id).toEqual(2);
        expect(secondTodo.title).toEqual("ダミータイトル2");
        expect(secondTodo.body).toEqual("ダミーボディ2");
        expect(secondTodo.createdAt).toBeInstanceOf(Date);
        expect(secondTodo.updatedAt).toBeInstanceOf(Date);
        expect(secondTodo.userId).toEqual(firstUser.id);
      });
    });
  });
  describe("【成功パターン】作成したデータに基づく取得・更新・削除テスト", () => {
    beforeEach(async () => {
      firstUser = await createTestUser();
      secondUser = await createTestUser();

      for (let i = 1; i <= 21; i++) {
        await prisma.todo.create({
          data: {
            title: `ダミータイトル${i}`,
            body: `ダミーボディ${i}`,
            user: {
              connect: { id: firstUser.id },
            },
          },
        });
      }
      for (let i = 1; i <= 5; i++) {
        await prisma.todo.create({
          data: {
            title: `dummyTitle${i}`,
            body: `dummyBody${i}`,
            user: {
              connect: { id: secondUser.id },
            },
          },
        });
      }
    });
    describe("【listメソッドのテスト】", () => {
      it("【パラメーターの指定なし】先頭から10件(secondUserは5件)のデータとTodoの総数を取得する。", async () => {
        const repository = new TodoRepository();
        const firstUserResult = await repository.list({ userId: firstUser.id });
        const secondUserResult = await repository.list({
          userId: secondUser.id,
        });

        expect(firstUserResult.items.length).toEqual(10);
        expect(firstUserResult.items[2].id).toEqual(3);
        expect(firstUserResult.items[2].title).toEqual("ダミータイトル3");
        expect(firstUserResult.items[2].body).toEqual("ダミーボディ3");
        expect(firstUserResult.totalCount).toEqual(21);

        expect(secondUserResult.items.length).toEqual(5);
        expect(secondUserResult.items[2].id).toEqual(24);
        expect(secondUserResult.items[2].title).toEqual("dummyTitle3");
        expect(secondUserResult.items[2].body).toEqual("dummyBody3");
        expect(secondUserResult.totalCount).toEqual(5);
      });
      it("【パラメーターの指定(page=2)】11件目のデータから20件のデータ(secondUserはデータなし)とTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const firstUserResult = await repository.list({
          userId: firstUser.id,
          page: 2,
        });
        const secondUserResult = await repository.list({
          userId: secondUser.id,
          page: 2,
        });

        expect(firstUserResult.items.length).toEqual(10);
        expect(firstUserResult.items[0].id).toEqual(11);
        expect(firstUserResult.items[0].title).toEqual("ダミータイトル11");
        expect(firstUserResult.items[0].body).toEqual("ダミーボディ11");
        expect(firstUserResult.totalCount).toEqual(21);

        expect(secondUserResult.items.length).toEqual(0);
        expect(secondUserResult.totalCount).toEqual(5);
      });
      it("【パラメーターの指定(count=5)】先頭から5件のデータとTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const firstUserResult = await repository.list({
          userId: firstUser.id,
          count: 5,
        });
        const secondUserResult = await repository.list({
          userId: secondUser.id,
          count: 5,
        });

        expect(firstUserResult.items.length).toEqual(5);
        expect(firstUserResult.items[4].id).toEqual(5);
        expect(firstUserResult.items[4].title).toEqual("ダミータイトル5");
        expect(firstUserResult.items[4].body).toEqual("ダミーボディ5");
        expect(firstUserResult.totalCount).toEqual(21);

        expect(secondUserResult.items.length).toEqual(5);
        expect(secondUserResult.items[4].id).toEqual(26);
        expect(secondUserResult.items[4].title).toEqual("dummyTitle5");
        expect(secondUserResult.items[4].body).toEqual("dummyBody5");
        expect(secondUserResult.totalCount).toEqual(5);
      });
      it("【パラメーターの指定(page=2,count=3)】4件目のデータから3件(secondUserは2件)のデータとTodo総数を取得する。", async () => {
        const repository = new TodoRepository();
        const firstUserResult = await repository.list({
          userId: firstUser.id,
          page: 2,
          count: 3,
        });
        const secondUserResult = await repository.list({
          userId: secondUser.id,
          page: 2,
          count: 3,
        });

        expect(firstUserResult.items.length).toEqual(3);
        expect(firstUserResult.items[0].id).toEqual(4);
        expect(firstUserResult.items[0].title).toEqual("ダミータイトル4");
        expect(firstUserResult.items[0].body).toEqual("ダミーボディ4");
        expect(firstUserResult.totalCount).toEqual(21);

        expect(secondUserResult.items.length).toEqual(2);
        expect(secondUserResult.items[0].id).toEqual(25);
        expect(secondUserResult.items[0].title).toEqual("dummyTitle4");
        expect(secondUserResult.items[0].body).toEqual("dummyBody4");
        expect(secondUserResult.totalCount).toEqual(5);
      });
    });
    describe("【findメソッドのテスト】", () => {
      it("【findメソッドを実行時】DBから、1件のTodoを取得する事ができる。", async () => {
        const repository = new TodoRepository();
        const initialTodo = await repository.find({
          userId: firstUser.id,
          todoId: 1,
        });
        const secondTodo = await repository.find({
          userId: firstUser.id,
          todoId: 2,
        });

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
    });
    describe("【updateメソッドのテスト】", () => {
      it("【updateメソッドを実行時】DB内のTodoを更新する事ができる。", async () => {
        const repository = new TodoRepository();

        const updatedTodo: Todo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: firstUser.id,
        });

        expect(updatedTodo).toEqual({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          createdAt: updatedTodo.createdAt,
          updatedAt: updatedTodo.updatedAt,
          userId: firstUser.id,
        });
      });
      it("【updateメソッドを実行時】updatedAtの方がcreatedAtよりも新しい時間になっている。", async () => {
        const repository = new TodoRepository();

        const updatedTodo = await repository.update({
          id: 1,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: firstUser.id,
        });

        expect(updatedTodo.createdAt < updatedTodo.updatedAt).toBeTruthy();
      });
    });
    describe("【deleteメソッドのテスト】", () => {
      it("【deleteメソッドを実行時】DB内の指定したTodoを削除する事ができる。", async () => {
        const repository = new TodoRepository();

        const oldTodos = await repository.list({ userId: firstUser.id });
        const deletedTodo = await repository.delete({
          userId: firstUser.id,
          todoId: 1,
        });
        const newTodos = await repository.list({ userId: firstUser.id });

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
        await repository.find({ userId: firstUser.id, todoId: 999 });
      }).rejects.toThrow("Todoの取得に失敗しました。");
    });
    it("【findメソッド実行時】ユーザーアカウントに紐づかないIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.find({ userId: secondUser.id, todoId: 1 });
      }).rejects.toThrow("Todoの取得に失敗しました。");
    });
    it("【updateメソッド実行時】ユーザーIDがない or 存在しないIDを指定した場合、エラーオブジェクトが返る。", () => {
      const repository = new TodoRepository();

      expect(async () => {
        await repository.update({
          id: 999,
          title: "変更後のタイトル",
          body: "変更後のボディ",
          userId: firstUser.id,
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
          userId: firstUser.id,
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
        repository.delete({ userId: firstUser.id, todoId: 1 }),
      ).rejects.toThrow("データベースにエラーが発生しました。");
    });
  });
});
