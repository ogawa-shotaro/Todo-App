import type { Request, Response } from "express";
import type { TodoInput } from "../../types/TodoRequest.type";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class CreateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async create(req: Request<any, any, TodoInput>, res: Response) {
    try {
      const { title, body } = req.body;
      const createdTodo = await this.repository.save({ title, body });

      res.status(200).json(createdTodo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
}
