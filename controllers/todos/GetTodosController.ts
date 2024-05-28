import type { Request, Response } from "express";
import { TodoRepository } from "../../repositories/TodoRepository";

export class GetTodosController {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  list(req: Request, res: Response) {
    const todos = this.repository.list();
    const responseData = todos.map((todo) => todo.getTodoEntity);

    return res.status(200).json(responseData);
  }
}
