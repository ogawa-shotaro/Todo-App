import type { Request } from "express";

import type { AuthenticatedRequest } from "../../../types/users/UserAuthRequest.type";

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

type MockAuthenticatedRequestArgMap = {
  cookies?: Record<string, string>;
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
}: MockAuthenticatedRequestArgMap &
  MockRequestArgMap): AuthenticatedRequest => {
  return {
    body: body ?? {},
    params: params ?? {},
    query: query ?? {},
    cookies: cookies ?? {},
    user: user ?? {},
  } as AuthenticatedRequest;
};
