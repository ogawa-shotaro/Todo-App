import type { Request, Response } from "express";
import { TodoRepository } from "../../repositories/TodoRepository";

export class GetTodoController {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  find(req: Request, res: Response) {
    const todos = this.repository.list();
    const id = req.params.id;
    const parsedNumber = parseInt(id, 10);
    const pickupTodo = todos.find((todo) => {
      if (todo.id === parsedNumber) {
        return todo;
      }
    });
    return res.status(200).json(pickupTodo);
  }
}
