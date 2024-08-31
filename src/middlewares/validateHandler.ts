import type { NextFunction, Request, Response } from "express";
import { ZodError, type z } from "zod";

import { InvalidError } from "../errors/InvalidError";

export function validator(schema: z.AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors
          .map((issue) => `${issue.message}`)
          .join(", ");
        console.log("errorMessages", errorMessages);
        const validatedError = new InvalidError(errorMessages);
        next(validatedError);
      } else {
        next(error);
      }
    }
  };
}
