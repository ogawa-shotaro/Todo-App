import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { IUserRepository } from "../../repositories/users/IUserRepository";
import type { AuthenticatedRequest } from "../../types/requests/AuthenticatedRequest.type";

export class DeleteUserController {
  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as number;
      const user = await this.repository.delete(userId);

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
