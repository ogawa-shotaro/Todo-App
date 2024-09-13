import { z } from "zod";

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().refine(
      (id) => {
        return Number(id) > 0;
      },
      {
        message: "IDは1以上の整数のみ。",
      },
    ),
  }),
  body: z.object({
    title: z
      .string({
        invalid_type_error: "入力内容が不適切(文字列のみ)です。",
      })
      .optional(),
    body: z
      .string({
        invalid_type_error: "入力内容が不適切(文字列のみ)です。",
      })
      .optional(),
  }),
});
