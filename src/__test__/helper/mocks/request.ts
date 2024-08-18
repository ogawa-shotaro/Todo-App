import { query, type Request } from "express";

type RequestBody = Record<string, string | number>;
type RequestParams = Record<string, string>;
type RequestQuery = Record<string, string | number | undefined>;

export const createMockRequest = (
  body?: RequestBody,
  params?: RequestParams,
  query?: RequestQuery
): Request => {
  return {
    body: body ?? {},
    params: params ?? {},
    query: query ?? {},
  } as Request;
};
