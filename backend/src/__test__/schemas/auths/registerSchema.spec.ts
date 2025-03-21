import { ZodError } from "zod";

import { registerSchema } from "../../../schemas/auths/registerSchema";

describe("【ユニットテスト】registerSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
      };

      const result = registerSchema.parse(data);

      expect(result).toEqual(data);
    });
  });
  describe("【異常パターン】", () => {
    it("【nameプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const data = {
        body: {
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
      };

      expect(() => registerSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["body", "name"],
            message: "ユーザー名の入力は必須です。",
          },
        ]),
      );
    });
    it("【nameプロパティ有り・入力値(1文字以上)がない場合】例外(min_error)が発生する。", () => {
      const data = {
        body: {
          name: "",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
      };

      expect(() => registerSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "too_small",
            minimum: 1,
            type: "string",
            inclusive: true,
            exact: false,
            message: "ユーザー名は1文字以上である必要があります。",
            path: ["body", "name"],
          },
        ]),
      );
    });
  });
});
