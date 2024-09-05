import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";

import { InvalidError } from "../../errors/InvalidError";
import { validator } from "../../middlewares/validateHandler";
import { createTodoSchema } from "../../schemas/createTodoSchema";
import { getTodosSchema } from "../../schemas/getTodosSchema ";
import { requestIdSchema } from "../../schemas/requestIdSchema";
import { updateTodoSchema } from "../../schemas/updateTodoSchema";
import { createMockRequest } from "../helper/mocks/request";
import { createMockResponse } from "../helper/mocks/response";

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
    it("バリデーションが成功(createTodoSchemaの場合)すると、next関数が呼び出される。", () => {
      req = createMockRequest({
        body: { title: "ダミータイトル", body: "ダミーボディ" },
      });

      const validatedFunc = validator(createTodoSchema, "body");
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
    it("バリデーションが成功(requestIdSchemaの場合)すると、next関数が呼び出される。", () => {
      req = createMockRequest({
        params: { id: "1" },
      });

      const validatedFunc = validator(requestIdSchema, "params");
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
    it("バリデーションが成功(getTodosSchemaの場合)すると、next関数が呼び出される。", () => {
      req = createMockRequest({
        query: { page: "1", count: "5" },
      });

      const validatedFunc = validator(getTodosSchema, "query");
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
    it("バリデーションが成功(updateTodoSchemaの場合)すると、next関数が呼び出される。", () => {
      req = createMockRequest({
        params: { id: "1" },
        body: {
          title: "変更後のタイトル",
          body: "変更後のボディ",
        },
      });

      const validatedId = validator(updateTodoSchema, "params");
      const validatedTitleBody = validator(updateTodoSchema, "body");

      validatedId(req, res, next);
      validatedTitleBody(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe("【異常パターン】", () => {
    it("バリデーションに失敗(createTodoSchemaの場合)すると、next関数がパラメーターにInvalidError(ZodErrorのエラー情報をInvalidErrorに変換)で呼び出される。", () => {
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

      const validatedFunc = validator(mockCreateTodoSchema, "body");
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "titleの内容は必須です。, bodyの内容は必須です。",
        }),
      );
    });
    it("バリデーションに失敗(requestIdSchemaの場合)すると、next関数がパラメーターにInvalidError(ZodErrorのエラー情報をInvalidErrorに変換)で呼び出される。", () => {
      const mockRequestIdSchema: AnyZodObject = {
        parse: jest.fn(() => {
          throw new ZodError([
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["id"],
              message: "IDは1以上の整数のみ。",
            },
          ]);
        }),
      } as Partial<AnyZodObject> as AnyZodObject;

      req = createMockRequest({
        params: { id: "0" },
      });

      const validatedFunc = validator(mockRequestIdSchema, "params");
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "IDは1以上の整数のみ。",
        }),
      );
    });
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

      const validatedFunc = validator(mockGetTodosSchema, "query");
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "pageは1以上の整数のみ。, countは1以上の整数のみ。",
        }),
      );
    });
    it("バリデーションに失敗(updateTodoSchemaの場合)すると、next関数がパラメーターにInvalidError(ZodErrorのエラー情報をInvalidErrorに変換)で呼び出される。", () => {
      const mockUpdateTodoSchema: AnyZodObject = {
        parse: jest.fn(() => {
          throw new ZodError([
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["title"],
              message: "入力内容が不適切(文字列のみ)です。",
            },
            {
              code: "invalid_type",
              expected: "string",
              received: "undefined",
              path: ["body"],
              message: "入力内容が不適切(文字列のみ)です。",
            },
          ]);
        }),
      } as Partial<AnyZodObject> as AnyZodObject;

      req = createMockRequest({
        params: { id: "1" },
        body: { title: 0, body: 0 },
      });

      const validatedFunc = validator(mockUpdateTodoSchema, "body");

      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message:
            "入力内容が不適切(文字列のみ)です。, 入力内容が不適切(文字列のみ)です。",
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

      const validatedFunc = validator(mockCreateTodoSchema, "body");
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
