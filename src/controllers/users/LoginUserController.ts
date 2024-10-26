import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUserRepository } from "../../repositories/users/IUserRepository";

export class LoginUserController {
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

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(StatusCodes.OK)
        .json({
          id: user.id,
          name: user.name,
          email: user.email,
        });
    } catch (error) {
      next(error);
    }
  }
}
