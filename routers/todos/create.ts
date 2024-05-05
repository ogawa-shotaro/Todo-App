import express from "express";
const router = express.Router();
import { TodoRepository } from "../../repositories/TodoRepository";
import { TodoController } from "../../controllers/todos/CreateTodoController";
const todoRepository = new TodoRepository();
const todoController = new TodoController(todoRepository);

router.route("/").post((req, res) => {
  todoController.create(req, res);
});
