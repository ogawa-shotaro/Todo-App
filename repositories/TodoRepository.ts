import type { TodoInput } from "../entities/Todo";
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
}
