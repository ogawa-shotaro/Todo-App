import type { Request } from "express";

export const createMockGetTodoRequest = (
  params: Partial<{ id: string }>
): Request => {
  return {
    params: { ...params },
  } as Request;
};
