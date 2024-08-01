import type { Request } from "express";

type requestId = any;
type requestBody = { title: string; body: string };

export class CreateMockRequests {
  createTodo(requestData: requestBody): Request {
    return {
      body: {
        ...requestData,
      },
    } as Request;
  }

  getTodo(requestData: requestId): Request {
    return {
      params: { ...requestData },
    } as Request;
  }
}
