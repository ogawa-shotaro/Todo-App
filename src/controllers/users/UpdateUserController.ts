import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IUserRepository } from "../../repositories/users/IUserRepository";
import { AuthenticatedRequest } from "../../types/requests/AuthenticatedRequest.type";

export class UpdateUserController {
  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { name, password, email } = req.body;
      const userId = req.user?.id as number;
      const user = await this.repository.update({
        userId,
        name,
        password,
        email,
      });

      res.status(StatusCodes.OK).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
}
