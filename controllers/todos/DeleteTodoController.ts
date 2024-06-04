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
    const deleteItem = this.repository.delete(parsedId);

    // if (!deleteItem) {
    //   const errorObj = {
    //     code: 404,
    //     message: "Not found",
    //     stat: "fail",
    //   };

    //   res.status(404).json(errorObj);
    //   return;
    // }
    const responseData = deleteItem;
    return res.status(200).json(responseData);
  }
}
