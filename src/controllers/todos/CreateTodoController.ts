import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import type { TodoInput } from "../../types/TodoRequest.type";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(req: Request<any, any, TodoInput>, res: Response) {
    try {
      const { title, body } = req.body;
      const createdTodo = await this.repository.save({ title, body });

      res.status(StatusCodes.OK).json(createdTodo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }
}
