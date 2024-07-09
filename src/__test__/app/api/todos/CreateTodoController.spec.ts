import { requestAPI } from "../../../helper/requestHelper";

describe("CreateTodoController.ts", () => {
  describe("成功パターン", () => {
    it("title.bodyを送ったら成功する", async () => {
      const requestData = {
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 200,
      }).send(requestData);

      const responseDataResult = response.body;

      expect(responseDataResult).toEqual({
        id: responseDataResult.id,
        title: responseDataResult.title,
        body: responseDataResult.body,
        createdAt: responseDataResult.createdAt,
        updatedAt: responseDataResult.updatedAt,
      });
    });
  });
  describe("異常パターン", () => {
    it("titleなしではエラー（400）が返る。", async () => {
      const requestNotTitleData = { body: "ダミーボディ" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400,
      }).send(requestNotTitleData);

      expect(response.body).toEqual({ message: "titleの内容は必須です" });
    });
    it("bodyなしではエラー（400）が返る。", async () => {
      const requestNotBodyData = { title: "ダミータイトル" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400,
      }).send(requestNotBodyData);

      expect(response.body).toEqual({ message: "bodyの内容は必須です" });
    });
  });
});
