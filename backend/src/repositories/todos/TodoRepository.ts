import { Prisma, PrismaClient } from "@prisma/client";
import type { Todo } from "@prisma/client";

import type { ITodoRepository } from "./ITodoRepository";

import { InternalServerError } from "../../errors/InternalServerError";
import { NotFoundError } from "../../errors/NotFoundError";
import type {
  TodoDeletionParams,
  TodoFindParams,
  TodoInput,
  TodoListParams,
  TodoModificationParams,
} from "../../types/todos/TodoRequest.type";

const prisma = new PrismaClient();
const DEFAULT_PAGE = 1;
const DEFAULT_COUNT = 10;

export class TodoRepository implements ITodoRepository {
  constructor(initialInputData?: TodoInput[]) {
    if (!initialInputData || initialInputData.length === 0) {
      return;
    }

    for (const input of initialInputData) {
      this.save(input);
    }
  }

  async save(inputData: TodoInput) {
    const todoData: Todo = await prisma.todo.create({
      data: {
        title: inputData.title,
        body: inputData.body,
        user: {
          connect: { id: inputData.userId },
        },
      },
    });

    return todoData;
  }

  async list({
    userId,
    page = DEFAULT_PAGE,
    count = DEFAULT_COUNT,
  }: TodoListParams) {
    const offset = (page - 1) * count;

    const items = await prisma.todo.findMany({
      where: { userId },
      skip: offset,
      take: count,
    });

    const totalCount = await prisma.todo.count({ where: { userId } });

    return { items, totalCount };
  }

  async find(inputData: TodoFindParams) {
    const todoItem = await prisma.todo.findUnique({
      where: {
        userId: inputData.userId,
        id: inputData.todoId,
      },
    });

    if (todoItem === null) {
      throw new NotFoundError("Todoの取得に失敗しました。");
    }

    return todoItem;
  }

  async update(inputData: TodoModificationParams) {
    try {
      const updatedItem = await prisma.todo.update({
        where: { id: inputData.id, userId: inputData.userId },
        data: {
          title: inputData.title,
          body: inputData.body,
        },
      });

      return updatedItem;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Todoの更新に失敗しました。");
      } else {
        throw new InternalServerError("データベースにエラーが発生しました。");
      }
    }
  }

  async delete(inputData: TodoDeletionParams) {
    try {
      const deletedItem = await prisma.todo.delete({
        where: { id: inputData.todoId, userId: inputData.userId },
      });

      return deletedItem;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("Todoの削除に失敗しました。");
      } else {
        throw new InternalServerError("データベースにエラーが発生しました。");
      }
    }
  }
}
