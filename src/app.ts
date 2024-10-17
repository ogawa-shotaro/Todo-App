import cookieParser from "cookie-parser";
import express from "express";

import { errorHandler } from "./middlewares/errorHandler";
import router from "./routers/todos";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);
app.use(errorHandler);

export default app;
