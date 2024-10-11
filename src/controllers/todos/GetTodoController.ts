import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";
import type { AuthenticatedRequest } from "../../types/users/UserAuthRequest.type";

export class GetTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async find(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const paramsId = req.params.id;
    const todoId = Number(paramsId);

    try {
      const todoItem = await this.repository.find({ todoId });

      res.status(StatusCodes.OK).json(todoItem);
    } catch (error) {
      next(error);
    }
  }
}
