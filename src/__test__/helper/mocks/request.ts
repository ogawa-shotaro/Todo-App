import type { Request } from "express";

type RequestBody = Record<string, string | number>;
type RequestParams = Record<string, string>;
type RequestQuery = Record<string, string | number | undefined>;

type MockRequestArgMap = {
  body?: RequestBody;
  params?: RequestParams;
  query?: RequestQuery;
};

export const createMockRequest = ({
  body,
  params,
  query,
}: MockRequestArgMap): Request => {
  return {
    body: body ?? {},
    params: params ?? {},
    query: query ?? {},
  } as Request;
};
