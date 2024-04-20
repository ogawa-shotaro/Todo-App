import express from "express";
const router = express.Router();
import { postTodo } from "../controllers/todos";

router.route("/").post(postTodo);

export default router;
