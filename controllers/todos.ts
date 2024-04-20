import type { Request, Response } from "express";
import { TodoInput } from "../models/Todo";
import { create } from "../models/Todo";

export const postTodo = (req: Request<any, any, TodoInput>, res: Response) => {
  try {
    const { title, body } = req.body;
    const createdTodo = create({ title, body });

    res.status(200).json(createdTodo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};
