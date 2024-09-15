import { ZodError } from "zod";

import { requestIdSchema } from "../../../schemas/todos/requestIdSchema";

describe("【ユニットテスト】requestIdSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = { params: { id: "1" } };
      const result = requestIdSchema.parse(data);

      expect(result).toEqual(data);
    });
  });
  describe("【異常パターン】", () => {
    it("【IDの入力値が不正(整数の1以上でない値)な場合】例外が発生する。", () => {
      const data = { params: { id: "0" } };

      expect(() => requestIdSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "custom",
            message: "IDは1以上の整数のみ。",
            path: ["params", "id"],
          },
        ]),
      );
    });
  });
});
