import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "titleの内容は必須です。" })
      .min(1, "titleは1文字以上である必要があります。"),
    body: z
      .string({ required_error: "bodyの内容は必須です。" })
      .min(1, "bodyは1文字以上である必要があります。"),
  }),
});
