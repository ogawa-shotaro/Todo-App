import express from "express";
import router from "./routers/todos";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);

export default app;
