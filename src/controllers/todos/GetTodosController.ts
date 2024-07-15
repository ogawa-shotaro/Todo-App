import type { Request, Response } from "express";
import { TodoRepository } from "../../repositories/TodoRepository";

export class GetTodosController {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async list(req: Request, res: Response) {
    const todos = await this.repository.list();

    res.status(200).json(todos);
  }
}
