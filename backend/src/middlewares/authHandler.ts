import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { AuthenticatedRequest } from "../types/auths/AuthenticatedRequest.type";

export function authHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new UnauthorizedError("認証に失敗しました。");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload;

    req.user = { id: decodedToken.userId };

    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      next(new UnauthorizedError("認証に失敗しました。"));
    }
    next(error);
  }
}
