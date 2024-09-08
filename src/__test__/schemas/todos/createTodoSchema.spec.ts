import { ZodError } from "zod";

import { createTodoSchema } from "../../../schemas/todos/createTodoSchema";
import { createMockRequest } from "../../helper/mocks/request";

describe("【ユニットテスト】createTodoSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const req = createMockRequest({
        body: { title: "ダミータイトル", body: "ダミーボディ" },
      });

      const mockParse = jest.spyOn(createTodoSchema, "parse");
      createTodoSchema.parse(req);

      expect(mockParse).toHaveBeenCalledWith(req);
    });
  });
  describe("【異常パターン】", () => {
    it("【バリデーションに失敗した場合】例外(ZodError)が発生する。", () => {
      const req = {
        body: {
          title: "",
          body: "",
        },
      };

      expect(() => createTodoSchema.parse(req)).toThrow(ZodError);
    });
  });
});
