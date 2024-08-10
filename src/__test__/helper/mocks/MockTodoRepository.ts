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
  private argumentStack: Todo[] = [];

  constructor() {
    this.nextId = 1;
    this.argumentStack = [];
  }

  getCallCount() {
    return this.callCount;
  }

  inputArgumentStack(inputTodoLength: number) {
    for (let i = 1; i <= inputTodoLength; i++) {
      const inputTodoData = {
        id: this.nextId++,
        title: `ダミータイトル${i}`,
        body: `ダミーボディ${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.argumentStack.push(inputTodoData);
    }
  }

  getArgumentStack(index: number) {
    return this.argumentStack[index];
  }

  getArgumentStacks() {
    return this.argumentStack;
  }

  async save(inputData: TodoInput): Promise<Todo> {
    if (!inputData.title) {
      throw new Error("titleの内容は必須です");
    }

    if (!inputData.body) {
      throw new Error("bodyの内容は必須です");
    }

    const savedTodo: Todo = {
      id: this.nextId++,
      title: inputData.title,
      body: inputData.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.argumentStack.push(savedTodo);

    this.callCount++;

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

    this.inputArgumentStack(20);

    const offset = (page - 1) * count;
    const todoItems = this.argumentStack.slice(offset, offset + count);

    this.callCount++;

    return todoItems;
  }

  async find(id: number): Promise<Todo> {
    this.inputArgumentStack(2);

    const todoItem = this.argumentStack.find((todo) => todo.id === id);

    if (!todoItem) {
      throw new Error();
    }

    this.callCount++;

    return todoItem;
  }

  async update({ id, title, body }: TodoUpdatedInput): Promise<Todo> {
    this.inputArgumentStack(2);

    const updatedItem = this.argumentStack.find((todo) => todo.id === id);
    if (!updatedItem) {
      throw new Error("存在しないIDを指定しました。");
    }

    updatedItem.title = title ? title : updatedItem.title;
    updatedItem.body = body ? body : updatedItem.body;
    updatedItem.updatedAt = new Date();

    this.callCount++;

    return updatedItem;
  }

  async delete(id: number): Promise<Todo> {
    this.inputArgumentStack(2);

    const deleteId = this.argumentStack.findIndex((todo) => todo.id === id);

    if (deleteId === -1) {
      throw new Error();
    }

    const deletedItem = this.argumentStack.splice(deleteId, 1)[0];

    this.callCount++;

    return deletedItem;
  }
}
