import express from "express";
const router = express.Router();

import { TodoRepository } from "../repositories/TodoRepository";
import { CreateTodoController } from "../controllers/todos/CreateTodoController";
import { GetTodosController } from "../controllers/todos/GetTodosController";
import { GetTodoController } from "../controllers/todos/GetTodoController";
import { UpdateTodoController } from "../controllers/todos/UpdateTodoController";
import { DeleteTodoController } from "../controllers/todos/DeleteTodoController";

const todoRepository = new TodoRepository();
const todoCreateController = new CreateTodoController(todoRepository);
const todosGetController = new GetTodosController(todoRepository);
const todoGetController = new GetTodoController(todoRepository);
const todoUpdateController = new UpdateTodoController(todoRepository);
const todoDeleteController = new DeleteTodoController(todoRepository);

router
  .route("/")
  .post((req, res, next) => {
    todoCreateController.create(req, res, next);
  })
  .get((req, res, next) => {
    todosGetController.list(req, res, next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    todoGetController.find(req, res, next);
  })
  .put((req, res, next) => {
    todoUpdateController.update(req, res, next);
  })
  .delete((req, res) => {
    todoDeleteController.delete(req, res);
  });

export default router;
