import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUserRepository } from "../../repositories/users/IUserRepository";

export class RegisterUserController {
  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password, email } = req.body;
      const newUser = await this.repository.register({ name, password, email });

      res.status(StatusCodes.OK).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}
