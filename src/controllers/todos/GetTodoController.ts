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

      res.status(200).json(todoItem);
    } catch (_) {
      const errorObj = {
        code: 404,
        message: "Not found",
        stat: "fail",
      };

      res.status(404).json(errorObj);
    }
  }
}
