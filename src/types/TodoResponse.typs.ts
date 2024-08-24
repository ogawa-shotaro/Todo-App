import type { InvalidError } from "../errors/InvalidError";
import type { NotFoundError } from "../errors/NotFoundError";

export type TypeErrors = InvalidError | NotFoundError | Error;
