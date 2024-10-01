import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { authHandler } from "../../middlewares/authHandler";
import { createMockRequest } from "../helper/mocks/request";
import { createMockResponse } from "../helper/mocks/response";

describe("【ユニットテスト】ミドルウェアでの認証機能のテスト", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  describe("【成功パターン】", () => {
    it("【認証に成功した場合】next関数が呼ばれる。", () => {
      const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      req = createMockRequest({
        cookies: {
          token: token,
        },
      });
      res = createMockResponse();
      next = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("【異常パターン】", () => {
    it("【トークンがない場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      req = createMockRequest({});
      res = createMockResponse();
      next = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
    it("【JWTが無効(シークレット値が異なる)な場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      const token = jwt.sign({ userId: 1 }, "wrong-secret-Key", {
        expiresIn: "1h",
      });

      req = createMockRequest({
        cookies: {
          token: token,
        },
      });
      res = createMockResponse();
      next = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
    it("【JWTが無効(期限切れ)な場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET!, {
        expiresIn: "-1h",
      });

      req = createMockRequest({
        cookies: {
          token: token,
        },
      });
      res = createMockResponse();
      next = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
  });
});
