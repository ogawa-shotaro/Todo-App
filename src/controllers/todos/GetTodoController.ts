import { StatusCodes } from "http-status-codes";
import type { Request, Response, NextFunction } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async find(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);

    try {
      const todoItem = await this.repository.find(parsedId);

      res.status(StatusCodes.OK).json(todoItem);
    } catch (error) {
      next(error);
    }
  }
}
