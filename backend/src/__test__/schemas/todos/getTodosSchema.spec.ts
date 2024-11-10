import { ZodError } from "zod";

import { getTodosSchema } from "../../../schemas/todos/getTodosSchema";

describe("【ユニットテスト】getTodosSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = { query: { page: "1", count: "5" } };
      const result = getTodosSchema.parse(data);

      expect(result).toEqual(data);
    });
  });
  describe("【異常パターン】", () => {
    it("【pageの入力値が不正(page=整数の1以上でない値)な場合】例外が発生する。", () => {
      const data = { query: { page: "0" } };

      expect(() => getTodosSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "custom",
            message: "pageは1以上の整数のみ。",
            path: ["query", "page"],
          },
        ]),
      );
    });
    it("【countの入力値が不正(count=整数の1以上でない値)な場合】例外が発生する。", () => {
      const data = { query: { count: "0" } };

      expect(() => getTodosSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "custom",
            message: "countは1以上の整数のみ。",
            path: ["query", "count"],
          },
        ]),
      );
    });
  });
});
