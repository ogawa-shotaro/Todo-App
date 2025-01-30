import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/todos/ITodoRepository";
import type { AuthenticatedRequest } from "../../types/requests/AuthenticatedRequest.type";

export class GetTodosController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const count = req.query.count ? Number(req.query.count) : undefined;

    try {
      const todos = await this.repository.list({ page, count });

      res.status(StatusCodes.OK).json(todos);
    } catch (error) {
      next(error);
    }
  }
}
