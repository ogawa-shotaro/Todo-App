import { ZodError } from "zod";

import { updateTodoSchema } from "../../../schemas/todos/updateTodoSchema";

describe("【ユニットテスト】updateTodoSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = {
        params: "1",
        body: {
          title: "変更後のタイトル",
          body: "変更後のボディ",
        },
      };

      const result = updateTodoSchema.parse(data);

      expect(result).toEqual(data);
    });
  });
  describe("【異常パターン】", () => {
    it("【IDの入力値が不正(整数の1以上でない値)な場合】例外が発生する。", () => {
      const data = {
        params: "0",
        body: {
          title: "変更後のタイトル",
          body: "変更後のボディ",
        },
      };

      expect(() => updateTodoSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "custom",
            message: "IDは1以上の整数のみ。",
            path: ["params"],
          },
        ]),
      );
    });
    it("【タイトルに不適切な値(文字列ではない値)が入力された場合】例外が発生する。", () => {
      const data = {
        params: "1",
        body: {
          title: 123,
          body: 456,
        },
      };

      expect(() => updateTodoSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "number",
            path: ["body", "title"],
            message: "入力内容が不適切(文字列のみ)です。",
          },
          {
            code: "invalid_type",
            expected: "string",
            received: "number",
            path: ["body", "body"],
            message: "入力内容が不適切(文字列のみ)です。",
          },
        ]),
      );
    });
  });
});
