export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoEntityInput extends TodoInput {
  id: number;
}

export class TodoEntity {
  public id: number;
  public title: string;
  public body: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({ id, title, body }: TodoEntityInput) {
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
