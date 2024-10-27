import { z } from "zod";

import { emailPasswordSchema } from "./shared/emailPasswordSchema";

export const loginUserSchema = z.object({
  body: emailPasswordSchema,
});
