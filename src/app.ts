import cookieParser from "cookie-parser";
import express from "express";

import { errorHandler } from "./middlewares/errorHandler";
import todoRouter from "./routers/todos";
import userRouter from "./routers/users";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);
app.use(errorHandler);

export default app;
