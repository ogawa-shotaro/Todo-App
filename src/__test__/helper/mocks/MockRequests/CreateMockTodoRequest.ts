import type { Request } from "express";

export const createMockTodoRequest = (
  body: Partial<{ title: string; body: string }>
): Request => {
  return {
    body: {
      ...body,
    },
  } as Request;
};
