import { ZodError } from "zod";

import { createTodoSchema } from "../../../schemas/todos/createTodoSchema";

describe("【ユニットテスト】createTodoSchemaの挙動テスト", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】例外が発生しない。", () => {
      const validateData = {
        body: {
          title: "ダミータイトル",
          body: "ダミーボディ",
        },
      };

      const result = createTodoSchema.parse(validateData);

      expect(result).toEqual(validateData);
    });
  });
  describe("【異常パターン】", () => {
    it("【titleプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const validateData = {
        body: {
          body: "ダミーボディ",
        },
      };

      expect(() => createTodoSchema.parse(validateData)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["body", "title"],
            message: "titleの内容は必須です。",
          },
        ]),
      );
    });
    it("【titleプロパティ有り・入力値(1文字以上)がない場合】例外(min_error)が発生する。", () => {
      const validateData = {
        body: {
          title: "",
          body: "ダミーボディ",
        },
      };

      expect(() => createTodoSchema.parse(validateData)).toThrow(
        new ZodError([
          {
            code: "too_small",
            minimum: 1,
            type: "string",
            inclusive: true,
            exact: false,
            message: "titleは1文字以上である必要があります。",
            path: ["body", "title"],
          },
        ]),
      );
    });
    it("【bodyプロパティの入力値がない場合】例外(required_error)が発生する。", () => {
      const validateData = {
        body: {
          title: "ダミータイトル",
        },
      };

      expect(() => createTodoSchema.parse(validateData)).toThrow(
        new ZodError([
          {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["body", "body"],
            message: "bodyの内容は必須です。",
          },
        ]),
      );
    });
    it("【bodyプロパティ有り・入力値(1文字以上)がない場合】例外(min_error)が発生する。", () => {
      const validateData = {
        body: {
          title: "ダミータイトル",
          body: "",
        },
      };
      expect(() => createTodoSchema.parse(validateData)).toThrow(
        new ZodError([
          {
            code: "too_small",
            minimum: 1,
            type: "string",
            inclusive: true,
            exact: false,
            message: "bodyは1文字以上である必要があります。",
            path: ["body", "body"],
          },
        ]),
      );
    });
  });
});
