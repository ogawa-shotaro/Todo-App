import express from "express";

import { CreateTodoController } from "../controllers/todos/CreateTodoController";
import { DeleteTodoController } from "../controllers/todos/DeleteTodoController";
import { GetTodoController } from "../controllers/todos/GetTodoController";
import { GetTodosController } from "../controllers/todos/GetTodosController";
import { UpdateTodoController } from "../controllers/todos/UpdateTodoController";
import { authHandler } from "../middlewares/authHandler";
import { validator } from "../middlewares/validateHandler";
import { TodoRepository } from "../repositories/todos/TodoRepository";
import { createTodoSchema } from "../schemas/todos/createTodoSchema";
import { getTodosSchema } from "../schemas/todos/getTodosSchema";
import { requestIdSchema } from "../schemas/todos/shared/requestIdSchema";
import { updateTodoSchema } from "../schemas/todos/updateTodoSchema";

const todoRouter = express.Router();

const todoRepository = new TodoRepository();
const todoCreateController = new CreateTodoController(todoRepository);
const todosGetController = new GetTodosController(todoRepository);
const todoGetController = new GetTodoController(todoRepository);
const todoUpdateController = new UpdateTodoController(todoRepository);
const todoDeleteController = new DeleteTodoController(todoRepository);

todoRouter
  .route("/")
  .post(authHandler, validator(createTodoSchema), (req, res, next) => {
    todoCreateController.create(req, res, next);
  })
  .get(authHandler, validator(getTodosSchema), (req, res, next) => {
    todosGetController.list(req, res, next);
  });

todoRouter
  .route("/:id")
  .get(authHandler, validator(requestIdSchema), (req, res, next) => {
    todoGetController.find(req, res, next);
  })
  .put(authHandler, validator(updateTodoSchema), (req, res, next) => {
    todoUpdateController.update(req, res, next);
  })
  .delete(authHandler, validator(requestIdSchema), (req, res, next) => {
    todoDeleteController.delete(req, res, next);
  });

export default todoRouter;