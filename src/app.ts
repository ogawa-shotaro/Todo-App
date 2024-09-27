import cookieParser from "cookie-parser";
import express from "express";

import { authHandler } from "./middlewares/authHandler";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routers/todos";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/todos", authHandler, router);
app.use(errorHandler);

export default app;
