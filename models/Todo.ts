export interface TodoInput {
  title: string;
  body: string;
}

export interface IndexTodo extends TodoInput {
  id: number;
}

export class TodoEntity {
  public readonly id: number;
  public readonly title: string;
  public readonly body: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({ id, title, body }: IndexTodo) {
    if (!title) {
      throw new Error("titleの内容は必須です");
    }
    if (!body) {
      throw new Error("bodyの内容は必須です");
    }

    this.id = id;
    this.title = title;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
