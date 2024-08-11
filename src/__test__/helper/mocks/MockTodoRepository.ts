import type { ITodoRepository } from "../../../repositories/ITodoRepository";
import type { Todo } from "@prisma/client";
import type {
  TodoInput,
  TodoUpdatedInput,
} from "../../../types/TodoRequest.type";

const DEFAULT_PAGE = 1;
const DEFAULT_COUNT = 10;

export class MockRepository implements ITodoRepository {
  private nextId: number;
  private callCount = 0;
  private argumentStack: any[];
  //argumentStackには、各メソッドの引数の値が入る。
  //各メソッドの引数は、異なるデータ構造の為、型指定はany型とする。
  constructor() {
    this.nextId = 1;
    this.argumentStack = [];
  }

  getCallCount() {
    return this.callCount;
  }

  getArgumentStack(index: number) {
    return this.argumentStack[index];
  }

  async save(inputData: TodoInput): Promise<Todo> {
    if (!inputData.title) {
      throw new Error("titleの内容は必須です");
    }

    if (!inputData.body) {
      throw new Error("bodyの内容は必須です");
    }

    this.argumentStack.push(inputData);
    this.callCount++;

    const savedTodo: Todo = {
      id: this.nextId++,
      title: inputData.title,
      body: inputData.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return savedTodo;
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
    const todoItems = this.argumentStack.slice(offset, offset + count);

    return todoItems;
  }

  async find(id: number): Promise<Todo> {
    const todoItem = this.argumentStack.find((todo) => todo.id === id);

    if (!todoItem) {
      throw new Error();
    }

    return todoItem;
  }

  async update({ id, title, body }: TodoUpdatedInput): Promise<Todo> {
    const updatedItem = this.argumentStack.find((todo) => todo.id === id);
    if (!updatedItem) {
      throw new Error("存在しないIDを指定しました。");
    }

    updatedItem.title = title ? title : updatedItem.title;
    updatedItem.body = body ? body : updatedItem.body;
    updatedItem.updatedAt = new Date();

    return updatedItem;
  }

  async delete(id: number): Promise<Todo> {
    const deleteId = this.argumentStack.findIndex((todo) => todo.id === id);

    if (deleteId === -1) {
      throw new Error();
    }

    const deletedItem = this.argumentStack.splice(deleteId, 1)[0];

    return deletedItem;
  }
}
