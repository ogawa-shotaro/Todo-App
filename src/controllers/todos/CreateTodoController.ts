import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import type { TodoInput } from "../../types/TodoRequest.type";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(
    req: Request<any, any, TodoInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, body } = req.body;
      const createdTodo = await this.repository.save({ title, body });

      res.status(StatusCodes.OK).json(createdTodo);
    } catch (error) {
      next(error);
    }
  }
}
