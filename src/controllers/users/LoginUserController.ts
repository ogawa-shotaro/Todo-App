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
      const token = await this.repository.login({
        password,
        email,
      });

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}
