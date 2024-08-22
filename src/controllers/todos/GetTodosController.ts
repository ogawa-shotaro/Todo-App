import { InvalidError } from "../../errors/InvalidError";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodosController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async list(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const count = req.query.count ? Number(req.query.count) : undefined;

    try {
      const todos = await this.repository.list({ page, count });

      res.status(StatusCodes.OK).json(todos);
    } catch (error) {
      if (error instanceof InvalidError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  }
}
