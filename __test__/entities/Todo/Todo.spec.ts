import { TodoEntity } from "../../../entities/Todo";

describe("TodoEntityクラス", () => {
  it("タイトルが未入力だとエラーになる", () => {
    const data = {
      id: 1,
      title: "",
      body: "ダミーボディ",
    };

    expect(() => {
      new TodoEntity(data);
    }).toThrow("titleの内容は必須です");
  });

  it("ボディが未入力だエラーになる", () => {
    const data = {
      id: 1,
      title: "ダミータイトル",
      body: "",
    };

    expect(() => {
      new TodoEntity(data);
    }).toThrow("bodyの内容は必須です");
  });

  it("タイトルとボディに入力内容(1文字以上)があればエラーは発生しない", () => {
    const data = {
      id: 1,
      title: "ダミータイトル",
      body: "ダミーボディ",
    };

    const instance = new TodoEntity(data);
    expect(instance.id).toEqual(1);
    expect(instance.title).toEqual("ダミータイトル");
    expect(instance.body).toEqual("ダミーボディ");
    expect(instance.createdAt).toBeInstanceOf(Date);
    expect(instance.updatedAt).toBeInstanceOf(Date);
  });
});
