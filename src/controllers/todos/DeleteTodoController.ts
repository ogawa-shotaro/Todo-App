import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class DeleteTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);

    try {
      const responseData = await this.repository.delete(parsedId);

      res.status(StatusCodes.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  }
}
