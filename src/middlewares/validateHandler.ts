import type { NextFunction, Request, Response } from "express";
import { ZodError, type z } from "zod";

import { InvalidError } from "../errors/InvalidError";

export function validator(
  schema: z.AnyZodObject,
  target: "body" | "params" | "query",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors
          .map((issue) => `${issue.message}`)
          .join(", ");

        const validatedError = new InvalidError(errorMessages);
        next(validatedError);
      } else {
        next(error);
      }
    }
  };
}
