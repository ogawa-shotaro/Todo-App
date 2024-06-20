export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoEntityInput extends TodoInput {
  createdAt?: Date;
  updatedAt?: Date;
}

export class TodoEntity {
  private title: string;
  private body: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({ title, body, createdAt, updatedAt }: TodoEntityInput) {
    if (!title) {
      throw new Error("titleの内容は必須です");
    }
    if (!body) {
      throw new Error("bodyの内容は必須です");
    }

    this.title = title;
    this.body = body;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  // clone() {
  //   return new TodoEntity({
  //     id: this.id,
  //     title: this.title,
  //     body: this.body,
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //   });
  // }

  public get getTodoEntity() {
    return {
      title: this.title,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
