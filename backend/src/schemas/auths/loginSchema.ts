import { z } from "zod";

import { emailPasswordSchema } from "./shared/emailPasswordSchema";

export const loginSchema = z.object({
  body: emailPasswordSchema,
});
