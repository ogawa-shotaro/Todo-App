import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { authHandler } from "../../middlewares/authHandler";
import { createMockAuthenticatedRequest } from "../helper/mocks/authRequest";
import { createMockResponse } from "../helper/mocks/response";

describe("【ユニットテスト】ミドルウェアでの認証機能のテスト", () => {
  describe("【成功パターン】", () => {
    it("【認証に成功した場合】next関数が呼ばれる。", () => {
      const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      const req: Request = createMockAuthenticatedRequest({
        cookies: {
          token: token,
        },
      });
      const res: Response = createMockResponse();
      const next: NextFunction = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toEqual({ id: 1 });
    });
  });
  describe("【異常パターン】", () => {
    it("【トークンがない場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      const req: Request = createMockAuthenticatedRequest({});
      const res: Response = createMockResponse();
      const next: NextFunction = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
    it("【JWTが無効(シークレット値が異なる)な場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      const token = jwt.sign({ userId: 1 }, "wrong-secret-Key", {
        expiresIn: "1h",
      });

      const req: Request = createMockAuthenticatedRequest({
        cookies: {
          token: token,
        },
      });
      const res: Response = createMockResponse();
      const next: NextFunction = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
    it("【JWTが無効(期限切れ)な場合】next関数(エラーオブジェクトを含む)が呼ばれる。", () => {
      const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET!, {
        expiresIn: "-1h",
      });

      const req: Request = createMockAuthenticatedRequest({
        cookies: {
          token: token,
        },
      });
      const res: Response = createMockResponse();
      const next: NextFunction = jest.fn();

      authHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });
  });
});
