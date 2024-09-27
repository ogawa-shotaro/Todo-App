import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";

interface AuthenticatedRequest extends Request {
  user?: string;
}

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const stringUserId = req.user;
      const user_id = Number(stringUserId);
      const { title, body } = req.body;

      const createdTodo = await this.repository.save({ title, body, user_id });

      res.status(StatusCodes.OK).json(createdTodo);
    } catch (error) {
      next(error);
    }
  }
}
