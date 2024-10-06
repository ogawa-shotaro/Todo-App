import { PrismaClient } from "@prisma/client";
import type { Todo } from "@prisma/client";

import type { ITodoRepository } from "./ITodoRepository";

import { NotFoundError } from "../errors/NotFoundError";
import type {
  TodoDeletionParams,
  TodoFindParams,
  TodoInput,
  TodoListParams,
} from "../types/TodoRequest.type";
import type { TodoModificationParams } from "../types/TodoRequest.type";

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
    page = DEFAULT_PAGE,
    count = DEFAULT_COUNT,
  }: TodoListParams = {}) {
    const offset = (page - 1) * count;

    const todos = await prisma.todo.findMany({
      skip: offset,
      take: count,
    });

    return todos;
  }

  async find(inputData: TodoFindParams) {
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

  async update(inputData: TodoModificationParams) {
    const updateItem = await prisma.todo.findUnique({
      where: { id: inputData.id, user_id: inputData.userId },
    });

    if (!updateItem) {
      throw new NotFoundError("Todoの更新に失敗しました。");
    }

    const updatedItem = await prisma.todo.update({
      where: { id: updateItem.id },
      data: {
        title: inputData.title,
        body: inputData.body,
      },
    });

    return updatedItem;
  }

  async delete(inputData: TodoDeletionParams) {
    const deleteItem = await prisma.todo.findUnique({
      where: {
        id: inputData.todoId,
        user_id: inputData.userId,
      },
    });

    if (!deleteItem) {
      throw new NotFoundError("Todoの削除に失敗しました。");
    }

    const deletedItem = prisma.todo.delete({
      where: { id: deleteItem.id },
    });

    return deletedItem;
  }
}
