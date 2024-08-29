import type { NextFunction, Request, Response } from "express";

import { validator } from "../../middlewares/validateHandler";
import { createTodoSchema } from "../../schemas/createTodoSchema";
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
  it("【成功パターン】バリデーションが成功すると、next関数が呼び出される。", () => {
    req = createMockRequest({
      body: { title: "ダミータイトル", body: "ダミーボディ" },
    });

    const validateFunc = validator(createTodoSchema);
    validateFunc(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
  it("【異常パターン】バリデーションが失敗すると、next関数がエラーオブジェクトと共に呼び出される。", () => {
    req = createMockRequest({
      body: { title: "", body: "" },
    });

    const validateFunc = validator(createTodoSchema);
    validateFunc(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
