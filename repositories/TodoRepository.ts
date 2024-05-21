import type { TodoEntityInput, TodoInput } from "../entities/Todo";
import { TodoEntity } from "../entities/Todo";

export class TodoRepository {
  private nextId = 1;
  private db: TodoEntity[] = [];

  constructor(initialInputData?: TodoInput[]) {
    if (!initialInputData || initialInputData.length === 0) {
      return;
    }

    for (const input of initialInputData) {
      this.save(input);
    }
  }

  save(input: TodoInput) {
    const inputData = new TodoEntity({
      id: this.nextId,
      ...input,
    });

    this.db.push(inputData);
    this.nextId++;

    return inputData;
  }

  list() {
    return this.db.slice();
  }

  find(id: number) {
    const todo = this.db.find((e) => e.id === id);
    if (!todo) {
      return null;
    }
    return todo;
  }

  update({ id, title, body }: TodoEntityInput) {
    if (!id) {
      throw new Error("idは必須です");
    }
    if (!title) {
      throw new Error("titleの内容は必須です");
    }
    if (!body) {
      throw new Error("bodyの内容は必須です");
    }
    const todo = this.db.find((e) => e.id === id);
    if (!todo) {
      throw new Error("idに該当するtodoが存在しません。");
    }

    todo.title = title;
    todo.body = body;
    todo.updatedAt = new Date();

    return todo;
  }
}
