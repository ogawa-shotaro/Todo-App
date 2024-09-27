import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { authHandler } from "../../middlewares/authHandler";
import { createMockRequest } from "../helper/mocks/request";
import { createMockResponse } from "../helper/mocks/response";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("【ユニットテスト】ミドルウェアでの認証機能のテスト", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = createMockRequest({});
    res = createMockResponse();
    next = jest.fn();
  });
  describe("【成功パターン】", () => {
    it("【認証に成功した場合】next関数が呼ばれる。", () => {
      req = createMockRequest({
        cookies: { token: "tokenedValue" },
      });
      res = createMockResponse();
      next = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
  describe("【異常パターン】", () => {
    it("【トークンがない場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      req = createMockRequest({ cookies: {} });
      // req = createMockRequest({ cookies: {} });
      res = createMockResponse();
      next = jest.fn();
      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
    it("【デコードに失敗した場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      req = createMockRequest({ cookies: {} });
      res = createMockResponse();
      next = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
  });
});
