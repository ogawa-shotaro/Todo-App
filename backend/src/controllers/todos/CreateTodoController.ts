import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/todos/ITodoRepository";
import type { AuthenticatedRequest } from "../../types/requests/AuthenticatedRequest.type";

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { title, body } = req.body;
      const userId = req.user?.id as number;
      const createdTodo = await this.repository.save({ title, body, userId });

      res.status(StatusCodes.OK).json(createdTodo);
    } catch (error) {
      next(error);
    }
  }
}
