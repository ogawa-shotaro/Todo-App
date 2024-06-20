import type { Request, Response } from "express";
import { TodoRepository } from "../../repositories/TodoRepository";

export class GetTodoController {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async find(req: Request, res: Response) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);
    const todoItem = await this.repository.find(parsedId);
    if (!todoItem) {
      const errorObj = {
        code: 404,
        message: "Not found",
        stat: "fail",
      };
      res.status(404).json(errorObj);
    }
    res.status(200).json(todoItem);
  }
}
