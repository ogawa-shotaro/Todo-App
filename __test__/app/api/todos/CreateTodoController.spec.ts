import { requestAPI } from "../../../helper/requestHelper";

describe("postメソッドのテスト", () => {
  it("titleなしではエラー（400）が返る。", async () => {
    const postData = { body: "test body" };

    const response = await requestAPI({
      method: "post",
      endPoint: "/api/todos",
      statusCode: 400,
    }).send(postData);

    expect(response.body).toEqual({ message: "titleの内容は必須です" });
  });

  it("bodyなしではエラー（400）が返る。", async () => {
    const postData = { title: "test title" };

    const response = await requestAPI({
      method: "post",
      endPoint: "/api/todos",
      statusCode: 400,
    }).send(postData);

    expect(response.body).toEqual({ message: "bodyの内容は必須です" });
  });

  it("title.bodyを送ったら成功する", async () => {
    const postData = {
      title: "test title",
      body: "test body",
    };

    const response = await requestAPI({
      method: "post",
      endPoint: "/api/todos",
      statusCode: 200,
    }).send(postData);

    const createdTodo = response.body;
    expect(createdTodo).toEqual({
      id: createdTodo.id,
      title: postData.title,
      body: postData.body,
      createdAt: createdTodo.createdAt,
      updatedAt: createdTodo.updatedAt,
    });
  });
});
