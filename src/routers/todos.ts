import express from "express";

import { CreateTodoController } from "../controllers/todos/CreateTodoController";
import { DeleteTodoController } from "../controllers/todos/DeleteTodoController";
import { GetTodoController } from "../controllers/todos/GetTodoController";
import { GetTodosController } from "../controllers/todos/GetTodosController";
import { UpdateTodoController } from "../controllers/todos/UpdateTodoController";
import { validator } from "../middlewares/validateHandler";
import { TodoRepository } from "../repositories/TodoRepository";
import { createTodoSchema } from "../schemas/todos/createTodoSchema";
import { getTodosSchema } from "../schemas/todos/getTodosSchema";
import { requestIdSchema } from "../schemas/todos/requestIdSchema";
import { updateTodoSchema } from "../schemas/todos/updateTodoSchema";

const router = express.Router();

const todoRepository = new TodoRepository();
const todoCreateController = new CreateTodoController(todoRepository);
const todosGetController = new GetTodosController(todoRepository);
const todoGetController = new GetTodoController(todoRepository);
const todoUpdateController = new UpdateTodoController(todoRepository);
const todoDeleteController = new DeleteTodoController(todoRepository);

router
  .route("/")
  .post(validator(createTodoSchema), (req, res, next) => {
    todoCreateController.create(req, res, next);
  })
  .get(validator(getTodosSchema), (req, res, next) => {
    todosGetController.list(req, res, next);
  });

router
  .route("/:id")
  .get(validator(requestIdSchema), (req, res, next) => {
    todoGetController.find(req, res, next);
  })
  .put(validator(updateTodoSchema), (req, res, next) => {
    todoUpdateController.update(req, res, next);
  })
  .delete(validator(requestIdSchema), (req, res, next) => {
    todoDeleteController.delete(req, res, next);
  });

export default router;
