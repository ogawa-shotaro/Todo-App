import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { InvalidError } from "../../errors/InvalidError";
import { NotFoundError } from "../../errors/NotFoundError";
import { errorHandler } from "../../middlewares/errorHandler";
import { createMockRequest } from "../helper/mocks/request";
import { createMockResponse } from "../helper/mocks/response";

describe("【ユニットテスト】ミドルウェアのエラーに対する共通化処理", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = createMockRequest({});
    res = createMockResponse();
    next = jest.fn();
  });
  it("【InvalidErrorでthrowした場合】errorHandler(パラメーターがInvalidError)を呼び出す。", () => {
    const error = new InvalidError("パラメーターが不正な値です。");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: "パラメーターが不正な値です。",
    });
  });
  it("【NotFoundErrorでthrowした場合】errorHandler(パラメーターがNotFoundError)を呼び出す。", () => {
    const error = new NotFoundError(
      "パラメータに指定した値は、データがありません。",
    );

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      message: "パラメータに指定した値は、データがありません。",
    });
  });

  it("【InvalidErrorでもNotFoundErrorでもない場合】パラメーターを「Internal Server Error」として、errorHandlerを呼び出す。", () => {
    const error = new Error("サーバー側の問題により、エラーが発生しました。");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
