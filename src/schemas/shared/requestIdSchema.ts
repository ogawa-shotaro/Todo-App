import { z } from "zod";

import { idParamsSchema } from "../shared/idParamsSchema";

export const requestIdSchema = z.object({
  params: z.object({ id: idParamsSchema }),
});
