import { z } from "zod";

import { idParamsSchema } from "./shared/idParamsSchema";

export const updateTodoSchema = z.object({
  params: z.object({ id: idParamsSchema }),
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
