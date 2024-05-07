import express from "express";
const router = express.Router();
import { TodoRepository } from "../repositories/TodoRepository";
import { TodoController } from "../controllers/todos/CreateTodoController";
import { TodosGetController } from "../controllers/todos/GetTodosController";
const todoRepository = new TodoRepository();
const todoController = new TodoController(todoRepository);
const todosGetController = new TodosGetController(todoRepository);

router
  .route("/")
  .post((req, res) => {
    todoController.create(req, res);
  })
  .get((req, res) => {
    todosGetController.list(req, res);
  });

export default router;
