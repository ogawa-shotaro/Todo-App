import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";
import type { TodoInput } from "../../types/TodoRequest.type";

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(
    req: Request<any, any, TodoInput>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { title, body, user_id } = req.body;
      const createdTodo = await this.repository.save({ title, body, user_id });

      res.status(StatusCodes.OK).json(createdTodo);
    } catch (error) {
      next(error);
    }
  }
}
