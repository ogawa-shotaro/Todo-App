import type { TodoInput } from "../models/entities";
import { TodoEntity } from "../models/entities";

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
}
