import { StatusCodes } from "http-status-codes";
import type { Request, Response, NextFunction } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodosController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async list(req: Request, res: Response, next: NextFunction) {
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
