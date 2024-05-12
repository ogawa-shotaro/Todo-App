import type { Request, Response } from "express";
import { TodoInput } from "../../entities/Todo";
import IRepository from "../../repositories/IRepository";

export class CreateTodoController {
  private repository: IRepository<TodoInput>;

  constructor(repository: IRepository<TodoInput>) {
    this.repository = repository;
  }

  create(req: Request<any, any, TodoInput>, res: Response) {
    try {
      const { title, body } = req.body;
      const createdTodo = this.repository.save({ title, body });
      res.status(200).json(createdTodo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
}
