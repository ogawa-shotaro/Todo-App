import type { TodoInput, TodoEntityInput } from "../entities/Todo";
import { TodoEntity } from "../entities/Todo";
import { PrismaClient } from "@prisma/client";
interface TodoUpdatedInput extends TodoEntityInput {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const prisma = new PrismaClient();
const DEFAULT_PAGE = 1;
const DEFAULT_COUNT = 10;

export class TodoRepository {
  constructor(initialInputData?: TodoInput[]) {
    if (!initialInputData || initialInputData.length === 0) {
      return;
    }

    for (const input of initialInputData) {
      this.save(input);
    }
  }

  async save(input: TodoInput) {
    const inputData = new TodoEntity({
      ...input,
    });
    const todoData = await prisma.todo.create({
      data: {
        title: inputData.getTodoEntity.title,
        body: inputData.getTodoEntity.body,
        createdAt: inputData.getTodoEntity.createdAt,
        updatedAt: inputData.getTodoEntity.updatedAt,
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
      throw new Error("pageは1以上の整数のみ");
    }
    if (count < 1 || !Number.isInteger(count)) {
      throw new Error("countは1以上の整数のみ");
    }
    const offset = (page - 1) * count;
    const todos = await prisma.todo.findMany({
      skip: offset,
      take: offset + count,
    });
    return todos;
  }

  async find(id: number) {
    if (typeof id !== "number" || id < 1) {
      throw new Error("idは必須です(1以上の数値)");
    }
    const todoItem = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    return todoItem;
  }

  async update({ id, title, body }: TodoUpdatedInput) {
    const updateTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: { title: title, body: body, updatedAt: new Date() },
    });

    return updateTodo;
  }

  async delete(id: number) {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return deleteTodo;
  }
}
