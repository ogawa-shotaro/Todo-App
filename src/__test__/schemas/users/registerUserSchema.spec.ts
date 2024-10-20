import { ZodError } from "zod";

import { registerUserSchema } from "../../../schemas/users/registerUserSchema";

describe("【ユニットテスト】registerUserSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "dummyData@mail.com",
        },
      };

      const result = registerUserSchema.parse(data);

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

      expect(() => registerUserSchema.parse(data)).toThrow(
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

      expect(() => registerUserSchema.parse(data)).toThrow(
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
    it("【passwordプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          email: "dummyData@mail.com",
        },
      };

      expect(() => registerUserSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["body", "password"],
            message: "パスワードの入力は必須です。",
          },
        ]),
      );
    });
    it("【passwordプロパティ有り・入力値が不正(8文字以下)な場合】例外(min_error)が発生する。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          password: "",
          email: "dummyData@mail.com",
        },
      };

      expect(() => registerUserSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "too_small",
            minimum: 8,
            type: "string",
            inclusive: true,
            exact: false,
            message: "パスワードは8文字以上である必要があります。",
            path: ["body", "password"],
          },
        ]),
      );
    });
    it("【passwordプロパティ有り・入力値が不正(16文字以上)な場合】例外(max_error)が発生する。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          password: "ExcessivePassword ",
          email: "dummyData@mail.com",
        },
      };

      expect(() => registerUserSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "too_big",
            maximum: 16,
            type: "string",
            inclusive: true,
            exact: false,
            message: "パスワードは16文字以下である必要があります。",
            path: ["body", "password"],
          },
        ]),
      );
    });
    it("【emailプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          password: "dummyPassword",
        },
      };

      expect(() => registerUserSchema.parse(data)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["body", "email"],
            message: "emailの入力は必須です。",
          },
        ]),
      );
    });
    it("【emailプロパティ有り・入力値の形式が正しくない場合】例外(zod.email_error)が発生する。", () => {
      const data = {
        body: {
          name: "ダミーユーザー",
          password: "dummyPassword",
          email: "incorrectFormat.com",
        },
      };
      expect(() => registerUserSchema.parse(data)).toThrow(
        new ZodError([
          {
            validation: "email",
            code: "invalid_string",
            message: "emailの形式が正しくありません。",
            path: ["body", "email"],
          },
        ]),
      );
    });
  });
});
