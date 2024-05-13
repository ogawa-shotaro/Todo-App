import type { Request, Response } from "express";
import { TodoRepository } from "../../repositories/TodoRepository";

export class GetTodoController {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  find(req: Request, res: Response) {
    const id = req.params.id;
    const parsedNumber = parseInt(id, 10);
    const pickupTodo = this.repository.find(parsedNumber);
    if (!pickupTodo) {
      res.status(404).json("IDに該当したTodoがありません。");
    }
    return res.status(200).json(pickupTodo);
  }
}
