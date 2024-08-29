import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

import { InvalidError } from "../errors/InvalidError";

export function validator(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
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
