import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";

import { InvalidError } from "../../../errors/InvalidError";
import { validator } from "../../../middlewares/validateHandler";
import { getTodosSchema } from "../../../schemas/todos/getTodosSchema";
import { createMockRequest } from "../../helper/mocks/request";
import { createMockResponse } from "../../helper/mocks/response";

describe("【ユニットテスト】ミドルウェアのバリデーション操作", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = createMockRequest({});
    res = createMockResponse();
    next = jest.fn();
  });
  describe("【成功パターン】", () => {
    it("バリデーションが成功(getTodosSchemaの場合)すると、next関数が呼び出される。", () => {
      req = createMockRequest({
        query: { page: "1", count: "5" },
      });

      const validatedFunc = validator(getTodosSchema);
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe("【異常パターン】", () => {
    it("バリデーションに失敗(getTodosSchemaの場合)すると、next関数がパラメーターにInvalidError(ZodErrorのエラー情報をInvalidErrorに変換)で呼び出される。", () => {
      const mockGetTodosSchema: AnyZodObject = {
        parse: jest.fn(() => {
          throw new ZodError([
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["page"],
              message: "pageは1以上の整数のみ。",
            },
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["count"],
              message: "countは1以上の整数のみ。",
            },
          ]);
        }),
      } as Partial<AnyZodObject> as AnyZodObject;

      req = createMockRequest({
        query: { page: "0", count: "0" },
      });

      const validatedFunc = validator(mockGetTodosSchema);
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "pageは1以上の整数のみ。, countは1以上の整数のみ。",
        }),
      );
    });
    it("プログラムの意図しないエラー(サーバー側の問題等)は、エラーメッセージ(InternalServerError)が返る", () => {
      const mockCreateTodoSchema: AnyZodObject = {
        parse: jest.fn(() => {
          throw new Error("InternalServerError");
        }),
      } as Partial<AnyZodObject> as AnyZodObject;

      req = createMockRequest({
        body: { title: "ダミータイトル", body: "ダミーボディ" },
      });

      const validatedFunc = validator(mockCreateTodoSchema);
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "InternalServerError",
        }),
      );
    });
  });
});
