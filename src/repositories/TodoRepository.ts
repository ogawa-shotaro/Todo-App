import { PrismaClient } from "@prisma/client";
import type { Todo } from "@prisma/client";

import type { ITodoRepository } from "./ITodoRepository";

import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { TodoFindParams, TodoInput } from "../types/TodoRequest.type";
import type { TodoUpdatedInput } from "../types/TodoRequest.type";

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
    if (!inputData.user.id) {
      throw new UnauthorizedError("Todoの作成は、認証ユーザーのみ可能です。");
    }

    const todoData: Todo = await prisma.todo.create({
      data: {
        title: inputData.title,
        body: inputData.body,
        user: {
          connect: { id: inputData.user.id },
        },
      },
    });

    return todoData;
  }

  async list(
    { userId }: { userId: number },
    { page = DEFAULT_PAGE, count = DEFAULT_COUNT } = {
      page: DEFAULT_PAGE,
      count: DEFAULT_COUNT,
    },
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError("Todoの閲覧は、認証ユーザーのみ可能です。");
    }

    const offset = (page - 1) * count;

    const todos = await prisma.todo.findMany({
      skip: offset,
      take: count,
    });

    return todos;
  }

  async find(inputData: TodoFindParams) {
    const user = await prisma.user.findUnique({
      where: { id: inputData.userId },
    });

    if (!user) {
      throw new UnauthorizedError("Todoの閲覧は、認証ユーザーのみ可能です。");
    }

    const todoItem = await prisma.todo.findUnique({
      where: {
        id: inputData.todoId,
      },
    });

    if (!todoItem) {
      throw new NotFoundError("存在しないIDを指定しました。");
    }

    return todoItem;
  }

  async update(inputData: TodoUpdatedInput) {
    const user = await prisma.user.findUnique({
      where: { id: inputData.user.id },
    });

    if (!user) {
      throw new UnauthorizedError("Todoの更新は、認証ユーザーのみ可能です。");
    }

    const updateItem = await prisma.todo.findUnique({
      where: { id: inputData.id },
    });

    if (!updateItem) {
      throw new NotFoundError("存在しないIDを指定しました。");
    }

    const updatedItem = await prisma.todo.update({
      where: { id: inputData.id, user_id: inputData.user.id },
      data: {
        title: inputData.title,
        body: inputData.body,
      },
    });

    return updatedItem;
  }

  async delete(inputData: TodoFindParams) {
    const user = await prisma.user.findUnique({
      where: { id: inputData.userId },
    });

    if (!user) {
      throw new UnauthorizedError("Todoの削除は、認証ユーザーのみ可能です。");
    }

    const deleteItem = await prisma.todo.findUnique({
      where: {
        id: inputData.todoId,
      },
    });

    if (!deleteItem) {
      throw new NotFoundError("存在しないIDを指定しました。");
    }

    const deletedItem = prisma.todo.delete({
      where: { id: deleteItem.id },
    });

    return deletedItem;
  }
}
