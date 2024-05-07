import express from "express";
const app = express();
import router from "./routers/todos";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);

export default app;
