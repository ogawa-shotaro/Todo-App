import type { Request } from "express";

type RequestBody = Record<string, string | number>;
type RequestParams = Record<string, string>;

export const createMockRequest = (
  body?: RequestBody,
  params?: RequestParams
): Request => {
  return {
    body: body ?? {},
    params: params ?? {},
  } as Request;
};
