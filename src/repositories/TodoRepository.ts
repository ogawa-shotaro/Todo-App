import { PrismaClient } from "@prisma/client";
import { InvalidError } from "../__test__/helper/CustomErrors/InvalidError";
import { NotFoundError } from "../__test__/helper/CustomErrors/NotFoundError";
import type { TodoInput } from "../types/TodoRequest.type";
import type { TodoUpdatedInput } from "../types/TodoRequest.type";
import type { Todo } from "@prisma/client";
import type { ITodoRepository } from "./ITodoRepository";

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
    if (!inputData.title) {
      throw new Error("titleの内容は必須です。");
    }

    if (!inputData.body) {
      throw new Error("bodyの内容は必須です。");
    }

    const todoData: Todo = await prisma.todo.create({
      data: {
        title: inputData.title,
        body: inputData.body,
      },
    });

    return todoData;
  }

  async list(
    { page = DEFAULT_PAGE, count = DEFAULT_COUNT } = {
      page: DEFAULT_PAGE,
      count: DEFAULT_COUNT,
    }
  ) {
    if (page < 1 || !Number.isInteger(page)) {
      throw new InvalidError("pageは1以上の整数のみ。", 400);
    }
    if (count < 1 || !Number.isInteger(count)) {
      throw new InvalidError("countは1以上の整数のみ。", 400);
    }

    const offset = (page - 1) * count;
    const todos = await prisma.todo.findMany({
      skip: offset,
      take: count,
    });

    return todos;
  }

  async find(id: number) {
    if (id < 1 || !Number.isInteger(id)) {
      throw new InvalidError("IDは1以上の整数のみ。", 400);
    }

    const todoItem = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todoItem) {
      throw new NotFoundError("存在しないIDを指定しました。", 404);
    }

    return todoItem;
  }

  async update({ id, title, body }: TodoUpdatedInput) {
    const updateItem = await prisma.todo.findUnique({
      where: { id: id },
    });

    if (!updateItem) {
      throw new Error("存在しないIDを指定しました。");
    }

    const updatedItem = await prisma.todo.update({
      where: { id: id },
      data: {
        title: title,
        body: body,
      },
    });

    return updatedItem;
  }

  async delete(id: number) {
    const deleteItem = await prisma.todo.findUnique({
      where: { id: id },
    });

    if (!deleteItem) {
      throw new Error("存在しないIDを指定しました。");
    }

    const responseDeleteItem = prisma.todo.delete({
      where: { id: id },
    });

    return responseDeleteItem;
  }
}
