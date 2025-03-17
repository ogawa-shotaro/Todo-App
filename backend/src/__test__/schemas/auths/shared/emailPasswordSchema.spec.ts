import { ZodError } from "zod";

import { emailPasswordSchema } from "../../../../schemas/auth/shared/emailPasswordSchema";

describe("【ユニットテスト】emailPasswordSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = {
        password: "dummyPassword",
        email: "dummyData@mail.com",
      };

      const result = emailPasswordSchema.parse(data);

      expect(result).toEqual(data);
    });
  });
  describe("【異常パターン】", () => {
    it("【passwordプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const data = {
        email: "dummyData@mail.com",
      };

      expect(() => emailPasswordSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["password"],
            message: "パスワードの入力は必須です。",
          },
        ]),
      );
    });
    it("【passwordプロパティ有り・入力値が不正(7文字以下)な場合】例外(min_error)が発生する。", () => {
      const data = {
        name: "ダミーユーザー",
        password: "Invalid",
        email: "dummyData@mail.com",
      };

      expect(() => emailPasswordSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "too_small",
            minimum: 8,
            type: "string",
            inclusive: true,
            exact: false,
            message: "パスワードは8文字以上である必要があります。",
            path: ["password"],
          },
        ]),
      );
    });
    it("【passwordプロパティ有り・入力値が不正(16文字より多い場合)な場合】例外(max_error)が発生する。", () => {
      const data = {
        password: "ExcessivePassword",
        email: "dummyData@mail.com",
      };

      expect(() => emailPasswordSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "too_big",
            maximum: 16,
            type: "string",
            inclusive: true,
            exact: false,
            message: "パスワードは16文字以下である必要があります。",
            path: ["password"],
          },
        ]),
      );
    });
    it("【emailプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const data = {
        password: "dummyPassword",
      };

      expect(() => emailPasswordSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["email"],
            message: "emailの入力は必須です。",
          },
        ]),
      );
    });
    it("【emailプロパティ有り・入力値の形式が正しくない場合】例外(zod.email_error)が発生する。", () => {
      const data = {
        password: "dummyPassword",
        email: "incorrectFormat.com",
      };
      expect(() => emailPasswordSchema.parse(data)).toThrow(
        new ZodError([
          {
            validation: "email",
            code: "invalid_string",
            message: "emailの形式が正しくありません。",
            path: ["email"],
          },
        ]),
      );
    });
  });
});
