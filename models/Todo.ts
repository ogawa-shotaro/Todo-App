const todos = [];

let nextId: number = 1;
export interface TodoInput {
  title: string;
  body: string;
}
class Todo {
  public readonly id: number;
  public readonly title: string;
  public readonly body: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({ title, body }: TodoInput) {
    if (!title) {
      throw new Error("titleの内容は必須です");
    }
    if (!body) {
      throw new Error("bodyの内容は必須です");
    }

    this.id = nextId++;
    this.title = title;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const create = ({ title, body }: TodoInput) => {
  const todo = new Todo({
    title: title,
    body: body,
  });
  todos.push(todo);

  return todo;
};
