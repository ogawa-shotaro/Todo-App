import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "titleの内容は必須です。"),
  body: z.string().min(1, "bodyの内容は必須です。"),
});
