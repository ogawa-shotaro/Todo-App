import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";

import { InvalidError } from "../../../errors/InvalidError";
import { validator } from "../../../middlewares/validateHandler";
import { createTodoSchema } from "../../../schemas/todos/createTodoSchema";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】createTodoSchemaの挙動テスト", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = createMockRequest({});
    res = createMockResponse();
    next = jest.fn();
  });
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】next関数が正常系で呼び出される。", () => {
      req = createMockRequest({
        body: { title: "ダミータイトル", body: "ダミーボディ" },
      });

      const validateFunc = validator(createTodoSchema);
      validateFunc(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe("【異常パターン】", () => {
    it("【バリデーションに失敗した場合】next関数が異常系(パラメーターにInvalidError(ZodErrorのエラー情報をInvalidErrorに変換))で呼び出される。", () => {
      const mockCreateTodoSchema: AnyZodObject = {
        parse: jest.fn(() => {
          throw new ZodError([
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["title"],
              message: "titleの内容は必須です。",
            },
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["body"],
              message: "bodyの内容は必須です。",
            },
          ]);
        }),
      } as Partial<AnyZodObject> as AnyZodObject;

      req = createMockRequest({
        body: { title: "", body: "" },
      });

      const validateFunc = validator(mockCreateTodoSchema);
      validateFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "titleの内容は必須です。, bodyの内容は必須です。",
        }),
      );
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)が返る。", () => {
      const mockCreateTodoSchema: AnyZodObject = {
        parse: jest.fn(() => {
          throw new Error("InternalServerError");
        }),
      } as Partial<AnyZodObject> as AnyZodObject;

      req = createMockRequest({
        body: { title: "ダミータイトル", body: "ダミーボディ" },
      });

      const validateFunc = validator(mockCreateTodoSchema);
      validateFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "InternalServerError",
        }),
      );
    });
  });
});
