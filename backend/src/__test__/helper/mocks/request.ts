import type { Request } from "express";

import type { AuthenticatedRequest } from "../../../types/auths/AuthenticatedRequest.type";

type RequestBody = Record<string, string | number>;
type RequestParams = Record<string, string>;
type RequestQuery = Record<string, string | number | undefined>;

type MockRequestArgMap = {
  body?: RequestBody;
  params?: RequestParams;
  query?: RequestQuery;
  cookies?: Record<string, string>;
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

type MockAuthenticatedRequestArgMap = MockRequestArgMap & {
  user?: {
    id: number;
  };
};

export const createMockAuthenticatedRequest = ({
  body,
  params,
  query,
  cookies,
  user,
}: MockAuthenticatedRequestArgMap): AuthenticatedRequest => {
  return {
    body: body ?? {},
    params: params ?? {},
    query: query ?? {},
    cookies: cookies ?? {},
    user: user ?? {},
  } as AuthenticatedRequest;
};
