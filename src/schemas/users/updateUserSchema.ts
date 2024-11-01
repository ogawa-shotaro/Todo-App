import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "ユーザー名は1文字以上である必要があります。")
      .optional(),
    password: z
      .string()
      .min(8, "パスワードは8文字以上である必要があります。")
      .max(16, "パスワードは16文字以下である必要があります。")
      .optional(),
    email: z.string().email("emailの形式が正しくありません。").optional(),
  }),
});
