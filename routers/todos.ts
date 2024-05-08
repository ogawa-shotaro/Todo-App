import express from "express";
const router = express.Router();
import { TodoRepository } from "../repositories/TodoRepository";
import { CreateTodoController } from "../controllers/todos/CreateTodoController";
import { GetTodosController } from "../controllers/todos/GetTodosController";
const todoRepository = new TodoRepository();
const todoController = new CreateTodoController(todoRepository);
const todosGetController = new GetTodosController(todoRepository);

router
  .route("/")
  .post((req, res) => {
    todoController.create(req, res);
  })
  .get((req, res) => {
    todosGetController.list(req, res);
  });

export default router;
