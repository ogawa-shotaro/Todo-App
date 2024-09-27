import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import type { AuthenticatedRequest } from "../types/users/UserAuthRequest.type";

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
    if (!decodedToken) {
      throw new UnauthorizedError("認証に失敗しました。");
    }

    req.user = decodedToken.user_id;

    next();
  } catch (error) {
    next(error);
  }
}
