import type { TodoEntityInput, TodoInput } from "../entities/Todo";
import { TodoEntity } from "../entities/Todo";

const DEFAULT_PAGE = 1;
const DEFAULT_COUNT = 10;

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

  list(
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
    const scopedTodos = this.db.slice(offset, offset + count);
    const clonedTodos = scopedTodos.map((todo) => todo.clone());

    return clonedTodos;
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
