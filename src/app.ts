import express from "express";
import router from "./routers/todos";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);
app.use(errorHandler);

export default app;
