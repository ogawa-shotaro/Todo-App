import { z } from "zod";

export const getTodosSchema = z.object({
  page: z
    .string()
    .refine(
      (query) => {
        return Number(query) > 0;
      },
      {
        message: "pageは1以上の整数のみ。",
      },
    )
    .optional(),
  count: z
    .string()
    .refine(
      (query) => {
        return Number(query) > 0;
      },
      {
        message: "countは1以上の整数のみ。",
      },
    )
    .optional(),
});

// {
//   invalid_type_error: "入力内容が不適切(文字列のみ)です。",
// }
// export const getTodosSchema = z.object({
//   page: z.number().int().nonpositive(),
//   count: z.number().int().nonpositive(),
// });
