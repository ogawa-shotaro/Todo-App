import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUserRepository } from "../../repositories/users/IUserRepository";
import { AuthenticatedRequest } from "../../types/auths/AuthenticatedRequest.type";

const TOKEN_KEY = "token";

const createCookieOptions = () => {
  return {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  };
};

export class SessionController {
  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;
      const { user, token } = await this.repository.login({
        password,
        email,
      });
      const options = createCookieOptions();

      res.cookie(TOKEN_KEY, token, options).status(StatusCodes.OK).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkAndRefresh(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user?.id as number;
      const { user, token } = await this.repository.checkAndRefresh(userId);
      const options = createCookieOptions();

      res.cookie(TOKEN_KEY, token, options).status(StatusCodes.OK).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(res: Response, next: NextFunction) {
    try {
      res
        .clearCookie(TOKEN_KEY, { httpOnly: true })
        .status(StatusCodes.OK)
        .json();
      next();
    } catch (error) {
      next(error);
    }
  }
}
