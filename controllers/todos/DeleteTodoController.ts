import type { Request, Response } from "express";
import { TodoRepository } from "../../repositories/TodoRepository";

export class DeleteTodoController {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  delete(req: Request, res: Response) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);

    try {
      const responseData = this.repository.delete(parsedId);
      res.status(200).json(responseData);
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
