import { z } from "zod";

export const requestIdSchema = z.object({
  id: z.string().refine(
    (id) => {
      return Number(id) > 0;
    },
    {
      message: "IDは1以上の整数のみ。",
    },
  ),
});
