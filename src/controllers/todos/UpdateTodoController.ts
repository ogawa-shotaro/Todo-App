import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";
import type { AuthenticatedRequest } from "../../types/users/UserAuthRequest.type";

export class UpdateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const paramsId = req.params.id;
    const todoId = Number(paramsId);
    const userId = req.user.id;
    const { title, body } = req.body;

    try {
      const responseData = await this.repository.update({
        id: todoId,
        title: title,
        body: body,
        userId: userId as number,
      });

      res.status(StatusCodes.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  }
}
