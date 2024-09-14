import { ZodError } from "zod";

import { idParamsSchema } from "../../../schemas/shared/idParamsSchema";

describe("【ユニットテスト】idParamsSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = "1";
      const result = idParamsSchema.parse(data);

      expect(result).toEqual(data);
    });
  });
  describe("【異常パターン】", () => {
    it("【IDの入力値が不正(整数の1以上でない値)な場合】例外が発生する。", () => {
      const data = "0";

      expect(() => idParamsSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "custom",
            message: "IDは1以上の整数のみ。",
            path: [],
          },
        ]),
      );
    });
  });
});
