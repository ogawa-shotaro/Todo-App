import { z } from "zod";

export const getTodosSchema = z.object({
  query: z.object({
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
  }),
});
