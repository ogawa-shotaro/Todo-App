import type { Request, Response } from "express";
import type { ITodoRepository } from "../../repositories/ITodoRepository";

export class UpdateTodoController {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const parsedId = parseInt(id, 10);
    const { title, body } = req.body;

    try {
      const responseData = await this.repository.update({
        id: parsedId,
        title: title,
        body: body,
      });

      res.status(200).json(responseData);
    } catch (_) {
      const errorObj = {
        code: 404,
        message: "Not found",
        stat: "fail",
      };

      res.status(404).json(errorObj);
    }
  }
}
