import { response } from "express";
import { requestAPI } from "../../../helper/requestHelper";

describe("CreateTodoController", () => {
  describe("成功パターン", () => {
    it("title.bodyを送ったら成功する。", async () => {
      const requestData = {
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      try {
        const response = await requestAPI({
          method: "post",
          endPoint: "/api/todos",
          statusCode: 200,
        }).send(requestData);

        const responseDataResult = response.body;

        expect(responseDataResult).toEqual({
          id: 1,
          title: "ダミータイトル",
          body: "ダミーボディ",
          createdAt: responseDataResult.createdAt,
          updatedAt: responseDataResult.updatedAt,
        });
      } catch (_) {}
    });
  });
  describe("異常パターン", () => {
    it("titleなしではエラー（400）が返る。", async () => {
      const requestBodyData = { body: "ダミーボディ" };

      try {
        await requestAPI({
          method: "post",
          endPoint: "/api/todos",
          statusCode: 400,
        }).send(requestBodyData);
      } catch (_) {}
    });

    it("bodyなしではエラー（400）が返る。", async () => {
      const requestTitleData = { title: "ダミータイトル" };

      try {
        await requestAPI({
          method: "post",
          endPoint: "/api/todos",
          statusCode: 400,
        }).send(requestTitleData);
      } catch (_) {}
    });
  });
});
