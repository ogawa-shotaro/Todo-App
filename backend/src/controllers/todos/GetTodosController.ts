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
    const userId = req.user?.id as number;
    const page = req.query.page ? Number(req.query.page) : undefined;
    const count = req.query.count ? Number(req.query.count) : undefined;

    try {
      const listResponse = await this.repository.list({
        userId,
        page,
        count,
      });

      res.status(StatusCodes.OK).json(listResponse);
    } catch (error) {
      next(error);
    }
  }
}
