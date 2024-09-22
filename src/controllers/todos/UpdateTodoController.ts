import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class UpdateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);
    const { title, body } = req.body;
    const user_id = req.body.user_id;

    try {
      const responseData = await this.repository.update({
        id: parsedId,
        title: title,
        body: body,
        user_id: user_id,
      });

      res.status(StatusCodes.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  }
}
