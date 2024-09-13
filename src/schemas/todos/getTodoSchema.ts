import { z } from "zod";

import { idParamsSchema } from "../shared/idParamsSchema";

export const getTodoSchema = z.object({
  params: idParamsSchema,
});