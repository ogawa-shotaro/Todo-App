import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";
import type { TodoInput } from "../../types/TodoRequest.type";
import type { AuthenticatedRequest } from "../../types/users/UserAuthRequest.type";

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user_id = req.user?.id;

      const { title, body } = req.body;

      const createdTodo = await this.repository.save({
        title,
        body,
        user_id,
      } as TodoInput);

      res.status(StatusCodes.OK).json(createdTodo);
    } catch (error) {
      next(error);
    }
  }
}
