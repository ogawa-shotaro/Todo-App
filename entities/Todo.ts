export interface TodoInput {
  title: string;
  body: string;
}

export interface TodoEntityInput extends TodoInput {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TodoEntity {
  private id: number;
  private title: string;
  private body: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({ id, title, body, createdAt, updatedAt }: TodoEntityInput) {
    if (!title) {
      throw new Error("titleの内容は必須です");
    }
    if (!body) {
      throw new Error("bodyの内容は必須です");
    }

    this.id = id;
    this.title = title;
    this.body = body;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  clone() {
    return new TodoEntity({
      id: this.id,
      title: this.title,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  update({ title, body }: TodoInput) {
    if (!title) {
      throw new Error("更新処理を中断(titleの更新データがない為)");
    }
    if (!body) {
      throw new Error("更新処理を中断(bodyの更新データがない為)");
    }

    this.title = title ?? this.title;
    this.body = body ?? this.body;
    this.updatedAt = new Date();
  }

  public get getTodoEntity() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
