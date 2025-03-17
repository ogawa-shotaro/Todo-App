import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/todos/ITodoRepository";
import type { AuthenticatedRequest } from "../../types/auths/AuthenticatedRequest.type";

export class DeleteTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const paramsId = req.params.id;
    const todoId = Number(paramsId);
    const userId = req.user?.id as number;

    try {
      const responseData = await this.repository.delete({ todoId, userId });

      res.status(StatusCodes.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  }
}
