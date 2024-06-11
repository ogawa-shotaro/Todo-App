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
    const todos = this.db.map((todo) => todo.clone());
    return todos;
  }

  find(id: number) {
    if (typeof id !== "number" || id < 1) {
      throw new Error("idは必須です(1以上の数値)");
    }

    const todo = this.db.find((e) => e.getTodoEntity.id === id);
    if (!todo) {
      return null;
    }
    return todo.clone();
  }

  update({ id, title, body }: TodoEntityInput) {
    if (typeof id !== "number" || id < 1) {
      throw new Error("idは必須です(1以上の数値)");
    }

    const todo = this.db.find((e) => e.getTodoEntity.id === id);
    if (!todo) {
      throw new Error("idに該当するtodoが存在しません。");
    }

    todo.update({ title, body });
    const entityData = todo.clone();
    return entityData.getTodoEntity;
  }

  delete(id: number) {
    if (typeof id !== "number" || id < 1) {
      throw new Error("idは必須です(1以上の数値)");
    }

    const deletionTodoIndex = this.db.findIndex(
      (e) => e.getTodoEntity.id === id
    );
    if (deletionTodoIndex === -1) {
      throw new Error("idに該当するtodoが存在しません。");
    }

    const deletionTodoEntity = this.db.splice(deletionTodoIndex, 1)[0];
    return deletionTodoEntity;
  }
}
