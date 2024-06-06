import express from "express";
const router = express.Router();
import { TodoRepository } from "../repositories/TodoRepository";
import { CreateTodoController } from "../controllers/todos/CreateTodoController";
import { GetTodosController } from "../controllers/todos/GetTodosController";
import { GetTodoController } from "../controllers/todos/GetTodoController";
import { DeleteTodoController } from "../controllers/todos/DeleteTodoController";
const todoRepository = new TodoRepository();
const todoCreateController = new CreateTodoController(todoRepository);
const todosGetController = new GetTodosController(todoRepository);
const todoGetController = new GetTodoController(todoRepository);
const todoDeleteController = new DeleteTodoController(todoRepository);

router
  .route("/")
  .post((req, res) => {
    todoCreateController.create(req, res);
  })
  .get((req, res) => {
    todosGetController.list(req, res);
  });

router
  .route("/:id")
  .get((req, res) => {
    todoGetController.find(req, res);
  })
  .delete((req, res) => {
    todoDeleteController.delete(req, res);
  });

export default router;
