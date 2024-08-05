import type { Request, Response } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodosController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async list(req: Request, res: Response) {
    const { page, count } = req.body;

    const todos = await this.repository.list({ page, count });

    res.status(200).json(todos);
  }
}
