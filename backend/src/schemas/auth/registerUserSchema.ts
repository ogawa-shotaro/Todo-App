import { z } from "zod";

import { emailPasswordSchema } from "./shared/emailPasswordSchema";

export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "ユーザー名の入力は必須です。" })
      .min(1, "ユーザー名は1文字以上である必要があります。"),
    ...emailPasswordSchema.shape,
  }),
});
