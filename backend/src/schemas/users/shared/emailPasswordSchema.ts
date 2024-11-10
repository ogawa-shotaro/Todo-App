import { z } from "zod";

export const emailPasswordSchema = z.object({
  password: z
    .string({ required_error: "パスワードの入力は必須です。" })
    .min(8, "パスワードは8文字以上である必要があります。")
    .max(16, "パスワードは16文字以下である必要があります。"),
  email: z
    .string({ required_error: "emailの入力は必須です。" })
    .email("emailの形式が正しくありません。"),
});
