import express from "express";
const router = express.Router();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);
app.listen(port, () => {
  console.log(`サーバーを起動しました( ${port})`);
});

export default app;
