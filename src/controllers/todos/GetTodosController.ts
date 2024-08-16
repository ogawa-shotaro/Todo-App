import type { Request, Response } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class GetTodosController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async list(req: Request, res: Response) {
    const { page, count } = req.body;

    try {
      const todos = await this.repository.list({ page, count });

      res.status(200).json(todos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }

      res.status(404).json();
    }
  }
}
