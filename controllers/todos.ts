import type { Request, Response } from "express";
import { TodoInput } from "../entities/Todo";
import { TodoRepository } from "../repositories/TodoRepository";

export const postTodo = (req: Request<any, any, TodoInput>, res: Response) => {
  try {
    const instance = new TodoRepository();
    const { title, body } = req.body;
    const createdTodo = instance.save({ title, body });

    res.status(200).json(createdTodo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
