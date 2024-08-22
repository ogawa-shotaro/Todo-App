import { InvalidError } from "../../errors/InvalidError";
import { NotFoundError } from "../../errors/NotFoundError";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async find(req: Request, res: Response) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);

    try {
      const todoItem = await this.repository.find(parsedId);

      res.status(StatusCodes.OK).json(todoItem);
    } catch (error) {
      if (error instanceof InvalidError || error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }
}
