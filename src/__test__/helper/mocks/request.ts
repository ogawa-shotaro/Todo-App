import type { Request } from "express";

type RequestBody = Record<string, string | number>;
type RequestParams = Record<string, string>;
type RequestQuery = Record<string, string | number | undefined>;
type RequestToken = Record<string, string>;
type MockRequestArgMap = {
  body?: RequestBody;
  params?: RequestParams;
  query?: RequestQuery;
  cookies?: RequestToken;
};

export const createMockRequest = ({
  body,
  params,
  query,
  cookies,
}: MockRequestArgMap): Request => {
  return {
    body: body ?? {},
    params: params ?? {},
    query: query ?? {},
    cookies: cookies ?? {},
  } as Request;
};
