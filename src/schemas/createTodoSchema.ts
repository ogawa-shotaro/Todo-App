import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string({ required_error: "titleの内容は必須です。" })
    .min(1, "titleの内容は必須です。"),
  body: z
    .string({ required_error: "bodyの内容は必須です。" })
    .min(1, "bodyの内容は必須です。"),
});
