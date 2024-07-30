import type { Request } from "express";

export const createMockGetTodoRequest = (
  id: Partial<{ id: string }>
): Request => {
  return {
    params: { ...id },
  } as Request;
};
