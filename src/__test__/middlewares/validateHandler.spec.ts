import type { Request, Response } from "express";
import { z } from "zod";

import { validator } from "../../middlewares/validateHandler";

describe("【ユニットテスト】ミドルウェアのバリデーション操作", () => {
  describe("【成功パターン】", () => {
    it("【バリデーションに成功した場合】next関数が正常系で呼び出される。", () => {
      const req = {
        body: { title: "ダミータイトル", body: "ダミーボディ" },
      } as Request;
      const res = {} as Response;
      const next = jest.fn();

      const schema = z.object({
        body: z.object({
          title: z.string(),
          body: z.string(),
        }),
      });

      const validatedFunc = validator(schema);
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe("【異常パターン】", () => {
    it("【バリデーションに失敗した場合】next関数が異常系で呼び出される,", () => {
      const req = {
        body: { title: 123, body: 456 },
      } as Request;
      const res = {} as Response;
      const next = jest.fn();

      const schema = z.object({
        body: z.object({
          title: z.string(),
          body: z.string(),
        }),
      });

      const validatedFunc = validator(schema);
      validatedFunc(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
