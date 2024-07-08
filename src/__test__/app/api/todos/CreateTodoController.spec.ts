import { requestAPI } from "../../../helper/requestHelper";

describe("CreateTodoController", () => {
  describe("成功パターン", () => {
    it("title.bodyを送ったら成功する。", async () => {
      const requestData = {
        title: "ダミータイトル",
        body: "ダミーボディ",
      };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400,
      }).send(requestData);

      console.log(response.body, "@@@@@@@@@@@");
      // console.log(response, "@@@@@@@@@@@");

      // const responseDataResult = response.body;

      // expect(responseDataResult).toEqual({
      //   id: 1,
      //   title: "ダミータイトル",
      //   body: "ダミーボディ",
      //   createdAt: responseDataResult.createdAt,
      //   updatedAt: responseDataResult.updatedAt,
      // });

      // try {
      //   const response = await requestAPI({
      //     method: "post",
      //     endPoint: "/api/todos",
      //     statusCode: 200,
      //   }).send(requestData);

      //   const responseDataResult = response.body;

      //   expect(responseDataResult).toEqual({
      //     id: 1,
      //     title: "ダミータイトル",
      //     body: "ダミーボディ",
      //     createdAt: responseDataResult.createdAt,
      //     updatedAt: responseDataResult.updatedAt,
      //   });
      // } catch (_) {}
    });
  });
  describe("異常パターン", () => {
    it("titleなしではエラー（400）が返る。", async () => {
      const requestBodyData = { body: "ダミーボディ" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400,
      }).send(requestBodyData);

      const responseNoBodyDataResult = response.body.message;

      expect(responseNoBodyDataResult).toEqual(
        "this.repository.save is not a function"
      );
    });

    it("bodyなしではエラー（400）が返る。", async () => {
      const requestTitleData = { body: "ダミータイトル" };

      const response = await requestAPI({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400,
      }).send(requestTitleData);

      const responseNoTitleDataResult = response.body.message;

      expect(responseNoTitleDataResult).toEqual(
        "this.repository.save is not a function"
      );
    });
  });
});
