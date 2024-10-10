import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async find(req: Request, res: Response, next: NextFunction) {
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
