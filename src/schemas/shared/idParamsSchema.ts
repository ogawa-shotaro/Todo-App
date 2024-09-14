import { z } from "zod";

export const idParamsSchema = z.string().refine(
  (id) => {
    return Number(id) > 0;
  },
  {
    message: "IDは1以上の整数のみ。",
  },
);
